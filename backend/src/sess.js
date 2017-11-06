import session from 'express-session'
import redis from 'redis'
import config from './config'

const { host, redis_conf } = config

const RedisStore = require('connect-redis')(session)
const client = redis.createClient(redis_conf.port, host)

/* eslint-disable no-console */
client.on('ready', () => {
  console.log('redis client is ready!')
})

client.on('error', (err) => {
  console.log(err)
})
/* eslint-enable no-console */

// use store to delete session for logout route
export const store = new RedisStore({
  client,
  prefix: 'session:',
  db: redis_conf.db,
})

const sess = {
  store,
  secret: 'session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {

    // if true, deserialize user will never be called
    secure: false,
    httpOnly: true,

    // 5 hrs duration
    maxAge: 1000 * 60 * 60 * 50,
  }
}

export default sess
