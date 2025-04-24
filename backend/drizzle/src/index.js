import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle({
  connection: {
    connectionString:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    ssl: true,
  },
})
