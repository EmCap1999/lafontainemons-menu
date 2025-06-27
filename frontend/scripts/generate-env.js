import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envFile = '.env'
console.log(`Loading environment from: ${envFile}`)
dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) })

const backendPort = process.env.BACKEND_PORT || '8080'
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200'
const isProduction = process.env.NODE_ENV === 'production'

const apiUrl = isProduction
  ? `${frontendUrl}/api`
  : `http://localhost:${backendPort}`

const envContent = `export const environment = {
  production: ${isProduction},
  apiUrl: '${apiUrl}',
  frontendUrl: '${frontendUrl}'
};
`

const envDir = path.join(__dirname, '../src/environments')
const envPath = path.join(envDir, 'environment.ts')

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true })
}

fs.writeFileSync(envPath, envContent)
console.log(
  ` Frontend Environment file generated for ${process.env.NODE_ENV || 'development'}!`
)
console.log(`API URL: ${apiUrl}`)
console.log(`Frontend URL: ${frontendUrl}`)
