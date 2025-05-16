import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Dotenv from 'dotenv-webpack'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../.env'),
      safe: true,
      allowEmptyValues: true,
      defaults: false,
    }),
  ],
}
