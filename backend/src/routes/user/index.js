import { Router } from 'express'
import csrf from 'csurf'
import passport from 'passport'
import userControl from './user.controller'
import { compose } from 'compose-middleware'

const router = Router()
const csrfProtection = csrf({ cookie: true })

const successRedirect = 'http://127.0.0.1:3000/'
const failureRedirect = 'http://127.0.0.1:3000/signin'

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return next()
  }
  res.redirect(successRedirect)
}

const middlewareWithPassport = (method) => compose([
  csrfProtection,
  isAuthenticated,
  passport.authenticate(method, {
    successRedirect,
    failureRedirect
  }),
])

router.post('/signup',
  middlewareWithPassport('local-signup'))

router.post('/signin', 
  middlewareWithPassport('local-signin'))

router.get('/signup/naver', 
  middlewareWithPassport('provider:naver'))

router.get('/naver/callback',
  middlewareWithPassport('provider:naver'))

router.get('/signup/facebook', 
  middlewareWithPassport('provider:facebook'))

router.get('/facebook/callback', 
  middlewareWithPassport('provider:facebook'))

router.get('/logout', userControl.logout)

export default router
