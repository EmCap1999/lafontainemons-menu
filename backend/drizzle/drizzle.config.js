import path from 'node:path'
import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

const rootDirectory = path.resolve(__dirname, '../../')
const envPath = path.join(rootDirectory, '.env')

console.log(`Loading environment from: ${envPath}`)
dotenv.config({ path: envPath })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_DOCKER,
  },
})
