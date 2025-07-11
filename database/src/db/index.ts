import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { drizzle } from 'drizzle-orm/node-postgres'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../schema/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDirectory = path.resolve(__dirname, '../../../')
const envPath = path.join(rootDirectory, '.env')

console.log(`Loading environment from: ${envPath}`)
const myEnv = dotenv.config({ path: envPath })
dotenvExpand.expand(myEnv)
console.log('DATABASE_URL loaded:', !!process.env.DATABASE_URL)

export type DrizzleDatabase = NodePgDatabase<typeof schema>

let db: DrizzleDatabase | undefined = undefined

export async function getDb(): Promise<DrizzleDatabase> {
  if (db) {
    return db
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  db = drizzle({
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    },
    schema,
  })

  return db
}

export { db }
