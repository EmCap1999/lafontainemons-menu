import path from 'node:path'
import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

const envDirectory = path.resolve(__dirname, '../../')

const envFiles = {
  production: path.join(envDirectory, 'environments', '.env.prod'),
  development: path.join(envDirectory, 'environments', '.env.dev'),
  local: path.join(envDirectory, 'environments', '.env.local'),
}

const nodeEnv = process.env.NODE_ENV || 'local'
const envPath = envFiles[nodeEnv] || envFiles.local

console.log(`Loading environment from: ${envPath}`)
dotenv.config({ path: envPath })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
