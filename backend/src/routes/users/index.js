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
  const { 
    email, 
    address1, 
    address2,
    postcode,
    phone,
    name,  
  } = req.user
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

  const user = (isSocial, isCompleted) => `
    sid:${passport.user};
    user:${isSocial ? rightProvider().displayName : email};
    social:${isSocial ? 'yes' : 'no'};
    completed:${isCompleted ? 'yes' : 'no'};
    address:${address1 + " " + address2};
    postcode:${postcode};
    phone:${phone};
    name:${name}`

  if (naver.displayName || facebook.displayName) {

    // 소셜 유저 중 회원가입 나머지 절차를 진행하지 않은 유저
    if (!req.user.name) {
      res.cookie(
        'user', 
        user(true, false), cookieOptions)
      res.redirect(isDev ? 'http://127.0.0.1:3000/signup': '/')
    } else {
      res.cookie(
        'user', 
        user(true, true), cookieOptions)
      res.redirect(isDev ? 'http://127.0.0.1:3000/': '/')
    }
  } else {
    res.cookie(
      'user', 
      user(false, true), cookieOptions)
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
