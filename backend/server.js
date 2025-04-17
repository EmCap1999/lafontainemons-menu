import cors from 'cors'
import express from 'express'
import './config/environment.js'
import corsOptions from './config/cors.js'
import { AppError, handleErrors } from './errors/app-errors.js'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use(handleErrors)

const PORT = process.env.BACKEND_PORT

try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
} catch (err) {
  throw new AppError(err.message, err.code)
}
