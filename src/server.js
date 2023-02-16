import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import { join } from 'path'
import routes from './routes/index.js'
import { errorHandler } from './middleware/error.middleware.js'
import { __dirname } from './utils/helper.js'

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
    await connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/library')
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    )
  } catch (e) {
    process.exit(1)
  }
}

start()