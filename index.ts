import express from 'express'

import '@/bootstrap/app'

import env from '@/env'
import routes from '@/routes'
import { errorHandler } from '@/middlewares/error.middleware'

const app = express()

app.use(express.json())

app.use('/api', routes)

app.use(errorHandler)

app.listen(env.APP_PORT, () => {
  console.log(`API listening on http://localhost:${env.APP_PORT}`)
})
