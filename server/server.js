import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import { join } from 'path'
import routes from './src/routes/index.js'
import { errorHandler } from './src/middleware/error.middleware.js'
import { __dirname } from './src/utils/helper.js'
import { initialUser } from './src/initialDataBase.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes)
app.use(errorHandler)

app.use('/uploads', express.static(join(__dirname, '../../..', 'uploads')))

async function start() {
  try {
    await connect('mongodb://localhost:27017/library1')
    app.listen(PORT, async () => {
      console.log(`Server has been started on port ${PORT}`)
      await initialUser()
    })
  } catch (e) {
    process.exit(1)
  }
}

start()
