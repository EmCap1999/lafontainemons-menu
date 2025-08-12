import { defineConfig } from 'drizzle-kit'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('DATABASE_URL is required in environment variables')
  console.error('Make sure your .env file is loaded at the application level')
  process.exit(1)
}

export default defineConfig({
  out: './drizzle',
  schema: './src/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
})
