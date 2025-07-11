import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getEnv } from '../config/environment.ts'
import { errorHandler, notFoundHandler } from '../middleware/error-handler.ts'
import { loggerMiddleware } from '../middleware/logger.ts'
import { menuApp } from './menu/app.ts'

const env = getEnv()

export const app = new Hono()

// Middleware global
app.use(
  '*',
  cors({
    origin: env.FRONTEND_URL,
    credentials: false,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use('*', loggerMiddleware)

app.route('/api/v1/menu', menuApp)

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  })
})

app.notFound(notFoundHandler)

app.onError(errorHandler)
