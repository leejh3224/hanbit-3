import React from 'react'
import { Redirect } from 'react-router-dom'
import Login from 'pages/Login'

const RedirectIf = (isLoggedIn, user) => {
  if (isLoggedIn && !user.social) {
    return <Redirect to="/" />
  }
  return <Login user={user} />
}

export default RedirectIf
