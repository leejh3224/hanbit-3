import app from './app'
import config from './config'

const { port } = config

app.listen(port, () => console.log(`Listening on port ${port}`)) // eslint-disable-line no-console
