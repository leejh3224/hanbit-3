import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

/* meterial-ui */
import { MuiThemeProvider } from 'material-ui/styles'
import theme from 'lib/theme'

/* styled-components */
import { ThemeProvider } from 'styled-components'
import styledTheme from 'lib/styledTheme'

/* normalize-css */
import 'normalize.css'

import Home from 'pages/Home'
import Login from 'pages/Login'
import Product from 'pages/Product'
import PropTypes from 'prop-types'

import cookie from 'cookie'

const App = () => {
  console.log(cookie.parse(document.cookie).user)
  return (
    <ThemeProvider theme={styledTheme}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/product/:id" component={Product} />
            <Route exact path="/(signin|signup)" component={Login} />
            <Route path="/:mode?" component={Home} />
            <Route render={() => <p>not found</p>} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

App.propTypes = {

}

export default App