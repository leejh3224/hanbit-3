import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import cookie from 'cookie'

/* meterial-ui */
import { MuiThemeProvider } from 'material-ui/styles'
import theme from 'lib/theme'

/* styled-components */
import { ThemeProvider } from 'styled-components'
import styledTheme from 'lib/styledTheme'

/* normalize-css */
import 'normalize.css'

import Header from 'pages/Header'
import Footer from 'pages/Footer'
import Home from 'pages/Home'
import Product from 'pages/Product'

import RedirectIf from 'lib/RedirectIf'

class App extends Component {
  state = {
    users: null,
  }
  componentWillMount() {
    const { user } = cookie.parse(document.cookie)

    if (user) {
      const sid = user.split(',')[0].split(":")[1].split("}")[0]
      const username = user.split(',')[1].split(":")[1].split("}")[0]

      this.setState(prev => ({ users: {
        ...prev.users,
        [sid]: {
          user: username,
        }
      }}))
    }
  }
  render() {
    const { users } = this.state
    const isLoggedIn = !!Object.keys(users || {}).length
    return (
      <ThemeProvider theme={styledTheme}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <Header isLoggedIn={isLoggedIn} />
              <Switch>
                <Route path="/product/:id" component={Product} />
                <Route exact path="/(signin|signup)" render={() => RedirectIf(isLoggedIn)} />
                <Route path="/:mode?" component={Home} />
                <Route render={() => <p>not found</p>} />
              </Switch>
              <Footer />
            </div>
          </Router>
        </MuiThemeProvider>
      </ThemeProvider>
    )
  }
}

export default App