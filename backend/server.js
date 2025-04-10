import cors from 'cors'
import express from 'express'
import './config/environment.js'
import corsOptions from './config/cors.js'

const app = express()
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT
const host =
  process.env.NODE_ENV === 'production'
    ? corsOptions.origin
    : `${corsOptions.origin}:${PORT}/`

app.listen(PORT, () => {
  console.log(`Server running on ${host}`)
})
