import path from 'node:path'
import dotenv from 'dotenv'

const envFiles = {
  production: './environments/.env.prod',
  development: './environments/.env.dev',
  local: './environments/.env.local',
}

const nodeEnv = process.env.NODE_ENV || 'local'

if (!envFiles[nodeEnv]) {
  console.warn(
    `Warning: The environment '${nodeEnv}' is not recognized. Defaulting to 'local' environment.`,
  )
}

const envPath = path.resolve(envFiles[nodeEnv])
console.log(`Loading environment from: ${envPath}`)

dotenv.config({ path: envPath })
