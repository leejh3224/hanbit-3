import express from 'express'
import multer from 'multer'
import mime from 'mime-types'
import crypto from 'crypto'
import path from 'path'

import userRouter from './users'
import productRouter from './products'
import reviewRouter from './reviews'

const routes = express.Router()

const storage = multer.diskStorage({
  destination: '../frontend/src/static/',
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + '.' + mime.extension(file.mimetype))
    })
  },
})

const upload = multer({ storage })
routes.post('/', upload.single('img'), (req, res) => {
  res.send('success')
})

routes.use('/users', userRouter)
routes.use('/products', productRouter)
routes.use('/reviews', reviewRouter)

routes.use((req, res, next) => {
  if (req.url.includes('/static')) {
    req.url += '/view'
  }
  next()
})
routes.use('/view', express.static(path.join(__dirname, '../../../frontend/build')))
routes.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../frontend/build/index.html'))
})

export default routes
