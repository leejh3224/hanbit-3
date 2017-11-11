import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import path from 'path'

import userRouter from './routes/users'
import productRouter from './routes/products'
import connectDB from './models'
import passportConfig from './passport'
import sess from './sess'
import config from './config'

const app = express()
app.use(helmet())

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}))

// connect db
connectDB()
app.use(cookieParser())
app.use(session(sess))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
passportConfig(app, passport)

// Routes
app.use('/users', userRouter)
app.use('/products', productRouter)

app.use((req, res, next) => {
  if (req.url.includes('/static')) {
    req.url += '/view'
  }
  next()
})
app.use('/view', express.static(path.join(__dirname, '../../frontend/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'))
})

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
