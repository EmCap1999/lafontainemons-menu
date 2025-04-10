import cors from 'cors'
import express from 'express'
import './config/environment.js'
import corsOptions from './config/cors.js'

const app = express()
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.BACKEND_PORT

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
