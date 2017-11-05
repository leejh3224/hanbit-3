import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'

import routes from './routes'
import connectDB from './models'
import passportConfig from './passport'
import sess from './sess'
import config from './config'

const app = express()
app.use(helmet())

app.set('view engine', 'pug')

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}))

// allow cors only in dev environment
if (config.env) {
  app.use(cors())
}

// connect db
connectDB()
app.use(cookieParser())
app.use(session(sess))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
passportConfig(app, passport)

// Routes
app.use('/', routes)
app.use(express.static(path.join(__dirname, '../public')))

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .json({
      err: err.message,
    })
})

export default app
