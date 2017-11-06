import { Router } from 'express'
import csrf from 'csurf'
import passport from 'passport'
import userControl from './user.controller'
import { compose } from 'compose-middleware'
import isEmpty from 'lodash/isEmpty'

const router = Router()
const csrfProtection = csrf({ cookie: true })

const customCallback = (req, res) => {
  const { passport } = req.session
  const { email } = req.user
  const { facebook, naver } = req.user.social
  const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 5,
  }
  const rightProvider = () => {
    if(isEmpty(facebook)) {
      return naver
    }
    return facebook
  }

  if (req.user) {
    if (req.user.social) {
      res.cookie(
        'user', 
        `{sid:'${passport.user}', user:'${email ? email : rightProvider().displayName}'}`, cookieOptions)
      res.redirect('http://127.0.0.1:3000/')
    } else {
      res.cookie(
        'user', 
        `{sid:'${passport.user}', user:'${email ? email : rightProvider().displayName}'}`, cookieOptions)
      res.end()
    }
  } else {
    res.status(404).end()
  }
}

const middlewareWithPassport = (method) => compose([
  //csrfProtection,
  passport.authenticate(method),
  customCallback,
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
