import { store } from '../../sess'

exports.index = (req, res) => {
  res.locals.csrfToken = req.csrfToken()
  res.render('user')
}

exports.logout = (req, res) => {
  if (!req.sessionID) {
    res.redirect('/user')
  }
  store.destroy(req.sessionID, () => {
    req.session.destroy(() => {
      res.redirect('/user')
    })
  })
}