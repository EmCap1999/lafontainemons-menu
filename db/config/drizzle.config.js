import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { defineConfig } from 'drizzle-kit'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDirectory = path.resolve(__dirname, '../../')
const envPath = path.join(rootDirectory, '.env')

console.log(`Loading environment from: ${envPath}`)
const myEnv = dotenv.config({ path: envPath })
dotenvExpand.expand(myEnv)

export default defineConfig({
  out: './migrations',
  schema: './schema/index.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})
