import express from 'express'
import multer from 'multer'
import mime from 'mime-types'
import crypto from 'crypto'

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

export default routes
