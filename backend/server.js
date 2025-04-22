import cors from 'cors'
import express from 'express'
import './config/environment.js'
import corsOptions from './config/cors.js'
import { testDatabaseConnection } from './config/database.js'
import { AppError, handleErrors } from './errors/app-errors.js'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use(handleErrors)

const startServer = async () => {
  const PORT = process.env.BACKEND_PORT || 3000
  await testDatabaseConnection()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
  })

  if (!process.env.BACKEND_PORT) {
    console.warn('BACKEND_PORT is not defined, defaulting to port 3000.')
  }
}

startServer().catch((err) => {
  throw new AppError(err.message, err.code || 500)
})
