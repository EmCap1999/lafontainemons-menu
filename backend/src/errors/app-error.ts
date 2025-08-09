import type { NextFunction, Request, Response } from 'express'

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.name = this.constructor.name

    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500
  let message = err.message || 'Internal Server Error'

  if (process.env.NODE_ENV === 'production' && statusCode >= 500) {
    message = 'Internal Server Error'
  }

  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${statusCode} - ${message}`
  )

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack)
  }

  if (res.headersSent) return

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  })
}

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
