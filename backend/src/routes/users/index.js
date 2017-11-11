import { Router } from 'express'
import csrf from 'csurf'
import passport from 'passport'
import userControl from './user.controller'
import { compose } from 'compose-middleware'
import config from '../../config'

const router = Router()
const isDev = !!config.env
const csrfProtection = csrf({ cookie: true })

const customCallback = (req, res) => {
  const { passport } = req.session
  const { email } = req.user
  const { naver, facebook } = req.user.social
  const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 5,
  }

  const rightProvider = () => {
    if(!facebook.displayName) {
      return naver
    }
    return facebook
  }

  if (naver.displayName || facebook.displayName) {

    // 소셜 유저 중 회원가입 나머지 절차를 진행하지 않은 유저
    if (!req.user.name) {
      res.cookie(
        'user', 
        `{sid:${passport.user}, user:${rightProvider().displayName}, social:yes, completed:no}`, cookieOptions)
      res.redirect(isDev ? 'http://127.0.0.1:3000/signup': '/')
    } else {
      res.cookie(
        'user', 
        `{sid:${passport.user}, user:${rightProvider().displayName}, social:yes, completed:yes}`, cookieOptions)
      res.redirect(isDev ? 'http://127.0.0.1:3000/': '/')
    }
  } else {
    res.cookie(
      'user', 
      `{sid:'${passport.user}', user:${email}, social:no, completed:yes}`, cookieOptions)
    res.end()
  }
}

const middlewareWithPassport = (method) => compose([
  //csrfProtection,
  passport.authenticate(method),
  customCallback,
])

router.get('/email/:email', userControl.findUserByEmail)

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

/* userId 는 각 인스턴스의 식별자 */
router.put('/:userId', userControl.editUser)

export default router
