import app from './app'
import config from './config'

const env = process.env.NODE_ENV
const { port } = config[env]

app.listen(port, () => console.log(`Listening on port ${port}`)) // eslint-disable-line no-console
