import { config as dotenv } from 'dotenv'
import merge from 'lodash/merge'

// get env variables
dotenv()

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3000,
    mongo: {
      uri: process.env.MONGO_URI,
    },
    redis_conf: {
      port: 6379,
      db: 0,
    },
    naver: {
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: '/users/naver/callback',
    },
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/users/facebook/callback',
    },
  },
  development: {}, 
  production: {
    host: process.env.HOST || 'http://hanbitglasses.com',
    port: process.env.PORT || 8080,
    redis_conf: {
      port: 6379,
      db: 1,
    },
  }
}

export default merge(config.all, config[config.all.env])
