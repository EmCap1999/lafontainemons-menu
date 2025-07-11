import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../../../.env')

console.log(`Loading environment from: ${envPath}`)

const env = dotenv.config({ path: envPath })
dotenvExpand.expand(env)

export interface EnvironmentVariables {
  NODE_ENV: string
  BACKEND_PORT: string
  FRONTEND_URL: string
  DATABASE_URL: string
}

export const getEnv = (): EnvironmentVariables => {
  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    BACKEND_PORT: process.env.BACKEND_PORT || '8080',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',
    DATABASE_URL: process.env.DATABASE_URL || '',
  }
}
