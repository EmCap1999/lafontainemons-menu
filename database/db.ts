import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as schema from '@lafontaine/database/src/schema'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../.env')

console.log(`Loading environment from: ${envPath}`)
const myEnv = dotenv.config({ path: envPath })
dotenvExpand.expand(myEnv)

export type DrizzleDatabase = ReturnType<typeof drizzle<typeof schema>>

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required in environment variables')
}

const client = postgres(process.env.DATABASE_URL, {
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
})

export const db: DrizzleDatabase = drizzle(client, { schema })

export { client }
