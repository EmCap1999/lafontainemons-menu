import * as path from 'node:path'
import * as dotenv from 'dotenv'
import { expand } from 'dotenv-expand'
import { defineConfig } from 'drizzle-kit'

const rootDirectory = path.resolve(process.cwd(), '../')
const envPath = path.join(rootDirectory, '.env')

console.log(`Loading environment from: ${envPath}`)
const myEnv = dotenv.config({ path: envPath })
expand(myEnv)

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required but not found')
}

export default defineConfig({
  out: './migrations',
  schema: './src/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
})
