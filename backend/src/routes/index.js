import userRouter from './user'
import { Router } from 'express'
import multer from 'multer'
import mime from 'mime-types'
import crypto from 'crypto'

const routes = Router()

const isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.redirect('/user')
}

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

routes.get('/', isAuthenticated, (req, res) => {
  res.redirect('/dashboard')
})

routes.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard')
})

routes.use('/user', userRouter)

export default routes
