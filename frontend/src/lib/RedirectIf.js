import React from 'react'
import { Redirect } from 'react-router-dom'
import Login from 'pages/Login'

const RedirectIf = (isLoggedIn) => {
  if (isLoggedIn) {
    return <Redirect to="/" />
  }
  return <Login />
}

export default RedirectIf
