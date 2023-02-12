import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url';

import routes from './routes/index.js'
import { errorHandler } from './middleware/error.middleware.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes)
app.use(errorHandler)
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

async function start() {
  try {
    await connect('mongodb://localhost:27017/library')
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    )
  } catch (e) {
    process.exit(1)
  }
}

start()
