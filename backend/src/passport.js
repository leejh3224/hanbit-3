import User from './models/User'
import { Strategy as LocalStrategy } from 'passport-local' 
import { Strategy as NaverStrategy } from 'passport-naver'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import config from './config'

const { naver, facebook } = config

module.exports = (app, passport) => {

  app.use(passport.initialize())
  app.use(passport.session())

  /* eslint-disable no-console */
  passport.serializeUser((user, done) => {
    console.log('serialize')
    done(null, user.id)
  })
  
  passport.deserializeUser((_id, done) => {
    console.log('deserialize')
    User.findById({ _id })
        .then(user => done(null, user))
        .catch(e => done(e, false))
  })
  /* eslint-enable no-console */
  
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true,
  }, (req, email, password, done) => {
    const {
      name,
      phone,
      postcode,
      address1,
      address2,
    } = req.body
    
    User.findOne({ email })
        .then(user => {
          if (user) {
            done(null, false)
          }
          const newUser = new User()
          newUser.email = email
          newUser.password = newUser.generateHash(password)
          newUser.name = name
          newUser.phone = phone
          newUser.postcode = postcode
          newUser.address1 = address1
          newUser.address2 = address2
          return newUser.save()
                 .then(user => done(null, user))
                 .catch(e => done(e, false))
        })
        .catch(e => done(e, false))
  }))

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.findOne({ email })
        .then(user => {
          if (!user) {
            done(null, false)
          } else if (!user.validatePassword(password)) {
            done(null, false)
          } else {

            // else로 감싸지 않으면 done 함수가 두 번 불려지고
            // can't set headers after they're set 에러를 일으킴
            done(null, user)
          }
        })
        .catch(e => done(e, false))
  }))

  /* naver */
  passport.use('provider:naver', new NaverStrategy({
    clientID: naver.clientID,
    clientSecret: naver.clientSecret,
    callbackURL: naver.callbackURL,
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'social.naver.id': profile.id })
        .then(user => {
          if (!user) {
            const newUser = new User()
            newUser.social.naver.access_token = accessToken
            newUser.social.naver.id = profile.id
            newUser.social.naver.displayName = profile.displayName
            return newUser.save()
                   .then(user => done(null, user))
                   .catch(e => done(e, false))
          } else {
            done(null, user)
          }
        })
        .catch(e => done(e, false))
  }))

  /* facebook */
  passport.use('provider:facebook', new FacebookStrategy({
    clientID: facebook.clientID,
    clientSecret: facebook.clientSecret,
    callbackURL: facebook.callbackURL,
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'social.facebook.id': profile.id })
        .then(user => {
          if (!user) {
            const newUser = new User()
            newUser.social.facebook.access_token = accessToken
            newUser.social.facebook.id = profile.id
            newUser.social.facebook.displayName = profile.displayName
            return newUser.save()
                   .then(user => done(null, user))
                   .catch(e => done(e, false))
          } else {
            done(null, user)
          }
        })
        .catch(e => done(e, false))
  }))
}