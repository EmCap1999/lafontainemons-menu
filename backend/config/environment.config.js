import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../../.env')

console.log(`Loading environment from: ${envPath}`)

const env = dotenv.config({ path: envPath })

dotenvExpand.expand(env)
