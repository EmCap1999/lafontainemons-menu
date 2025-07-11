import { serve } from '@hono/node-server'
import { getEnv } from '../config/environment.js'
import { app } from './app.js'

const env = getEnv()
const port = Number.parseInt(env.BACKEND_PORT)

console.log('🚀 Starting server...')
console.log(`📍 Environment: ${env.NODE_ENV}`)
console.log(`🌐 Frontend URL: ${env.FRONTEND_URL}`)

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`✅ Server running on http://localhost:${info.port}`)
    console.log(`🔍 Health Check: http://localhost:${info.port}/health`)
    console.log(`📋 API Menu: http://localhost:${info.port}/api/v1/menu/sections`)
  }
)
