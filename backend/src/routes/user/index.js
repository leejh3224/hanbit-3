import { Router } from 'express'
import csrf from 'csurf'
import passport from 'passport'
import userControl from './user.controller'

const router = Router()
const csrfProtection = csrf({ cookie: true })

const successRedirect = '/dashboard'
const failureRedirect = '/user'

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return next()
  }
  res.redirect(successRedirect)
}

/*
  cors protection:
    1. only use for form page
    2. res.locals.csrfToken => global variable
*/
router.get('/', csrfProtection, isAuthenticated, userControl.index)

router.post('/signup', csrfProtection, isAuthenticated, passport.authenticate('local-signup', {
  successRedirect,
  failureRedirect,
}))

router.post('/signin', csrfProtection, isAuthenticated, passport.authenticate('local-signin', {
  successRedirect,
  failureRedirect,
}))

router.get('/signup/naver', csrfProtection, isAuthenticated, passport.authenticate('provider:naver', {
  successRedirect,
  failureRedirect,
}))

router.get('/naver/callback', csrfProtection, isAuthenticated, passport.authenticate('provider:naver', {
  successRedirect,
  failureRedirect,
}))

router.get('/signup/facebook', csrfProtection, isAuthenticated, passport.authenticate('provider:facebook', {
  successRedirect,
  failureRedirect,
}))

router.get('/facebook/callback', csrfProtection, isAuthenticated, passport.authenticate('provider:facebook', {
  successRedirect,
  failureRedirect,
}))

router.get('/logout', userControl.logout)

export default router
