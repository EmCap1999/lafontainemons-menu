import type { Context } from 'hono'

export const errorHandler = async (err: Error, c: Context) => {
  console.error('Error:', err)

  return c.json({
    error: err.message || 'Internal Server Error',
  })
}

export const notFoundHandler = (c: Context) => {
  return c.json({
    error: `Route ${c.req.path} not found`,
  })
}

export class AppError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AppError'
  }
}
