import User from '../../models/User'
import { store } from '../../sess'
import config from '../../config'

const isDev = !!config.env

exports.findUserByEmail = (req, res) => {
  const { email } = req.params

  return User.findOne({ email })
             .then(user => {
               if (!user) {
                 res.json({ available: true })
               } else {
                 res.json({ available: false })
               }
             })
}

exports.logout = (req, res) => {
  if (!req.sessionID) {
    res.redirect(isDev ? 'http://127.0.0.1:3000': '/')
  }
  store.destroy(req.sessionID, () => {
    res.clearCookie('user')
    req.session.destroy(() => {
      res.redirect(isDev ? 'http://127.0.0.1:3000': '/')
    })
  })
}

exports.editUser = (req, res) =>{
  const { userId } = req.params
  const { name, phone, postcode, address1, address2 } = req.body

  User.findByIdAndUpdate(userId, 
  {
    name, 
    phone, 
    postcode, 
    address1, 
    address2,
  }).then(() => {
    res.json({ updated: true })
  }).catch(error => res.json({ error }))
}

