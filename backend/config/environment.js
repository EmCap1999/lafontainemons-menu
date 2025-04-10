import { resolve } from 'node:path'
import dotenv from 'dotenv'

const envPath =
  process.env.NODE_ENV === 'production'
    ? resolve('./environments/.env.prod')
    : resolve('./environments/.env.dev')

dotenv.config({
  path: envPath,
})

console.log(`Using ${process.env.NODE_ENV} environment`)
