import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { drizzle } from 'drizzle-orm/node-postgres'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDirectory = path.resolve(__dirname, '../../')
const envPath = path.join(rootDirectory, '.env')

const env = dotenv.config({ path: envPath })
dotenvExpand.expand(env)

export const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
}

export const db = drizzle({
  connection: dbConfig,
})

export const testConnection = async () => {
  try {
    await db.execute('SELECT 1')
    console.log('Database connection successful')
    return true
  } catch (error) {
    console.error('Database connection failed:', error.message)
    return false
  }
}
