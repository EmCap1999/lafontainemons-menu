import cors from 'cors'
import express from 'express'
import './config/environment.config.js'
import corsOptions from './config/cors.config.js'
import { AppError, handleErrors } from './errors/app-errors.js'
import menuRoutes from './routes/menu.routes.js'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use(menuRoutes)

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found on this server`, 404))
})

app.use(handleErrors)

const startServer = async () => {
  const PORT = process.env.BACKEND_PORT || 3000

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
  })

  if (!process.env.BACKEND_PORT) {
    console.warn('BACKEND_PORT is not defined, defaulting to port 3000.')
  }
}

startServer().catch((err) => {
  console.error('Failed to start server:', err)
  throw new AppError(err.message, err.code || 500)
})
