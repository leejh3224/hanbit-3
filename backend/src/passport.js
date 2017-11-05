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
  }, (email, password, done) => {
    User.findOne({ email })
        .then(user => {
          if (user) {
            return done(null, false)
          }
          const newUser = new User()
          newUser.email = email
          newUser.password = newUser.generateHash(password)
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
            return done(null, false)
          }

          if (!user.validatePassword(password)) {
            return done(null, false)
          }

          return done(null, user)
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
          }
          return done(null, user)
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
          }
          return done(null, user)
        })
        .catch(e => done(e, false))
  }))
}