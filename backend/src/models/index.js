import mongoose from 'mongoose'
import config from '../config'

const { uri } = config.mongo

const connectDB = () => {

  /* use promise for mongoose */
  mongoose.Promise = global.Promise

  /* eslint-disable no-console */
  return mongoose.connect(uri, {
    useMongoClient: true,
  }).then(() => console.log(`connected to db!`))
  .catch(e => console.log(e))
  /* eslint-enable no-console */
}

export default connectDB
