import path from 'node:path'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { defineConfig } from 'drizzle-kit'

const rootDirectory = path.resolve(__dirname, '../../')
const envPath = path.join(rootDirectory, '.env')

console.log(`Loading environment from: ${envPath}`)
const myEnv = dotenv.config({ path: envPath })
dotenvExpand.expand(myEnv)

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
