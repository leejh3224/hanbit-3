import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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
import PropTypes from 'prop-types'

const App = () => {
  return (
    <ThemeProvider theme={styledTheme}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
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