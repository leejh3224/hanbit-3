import { store } from '../../sess'

exports.index = (req, res) => {
  res.locals.csrfToken = req.csrfToken()
  res.render('user')
}

exports.logout = (req, res) => {
  if (!req.sessionID) {
    res.redirect('http://127.0.0.1:3000/')
  }
  store.destroy(req.sessionID, () => {
    res.clearCookie('user')
    req.session.destroy(() => {
      res.redirect('http://127.0.0.1:3000/')
    })
  })
}