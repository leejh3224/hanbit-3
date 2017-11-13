import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import cookie from 'cookie'
import axios from 'axios'

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
import Welcome from 'pages/Welcome'
import Product from 'pages/Product'

import RedirectIf from 'lib/RedirectIf'

class App extends Component {
  state = {
    users: null,
    products: null
  }
  componentWillMount() {
    const { user } = cookie.parse(document.cookie)
    
    if (user) {
      const getField = (str, index) => str.split(',')[index].split(":")[1].split("}")[0]
      const sid = getField(user, 0)
      const username = getField(user, 1)
      const isSocialUser = getField(user, 2) === 'yes'
      const register_completed = getField(user, 3) === 'yes'

      this.setState(prev => (
        { 
          ...prev,
          users: {
            ...prev.users,
            [sid]: {
              userId: sid,
              user: username,
              social: isSocialUser,
              register_completed,
            }
          },
        }
      ))
    }

    /* load first eight products */
    axios.get('/products/limit/8', { timeout: 20000 })
    .then(response => {
      const { products } = response.data
      
      this.setState(prev => ({
        ...prev,
        products: products.reduce((obj, v) => {
          obj[v._id] = v
          return obj
        }, {})
      }))
    })
  }
  render() {
    const { users, products } = this.state
    const isLoggedIn = !!Object.keys(users || {}).length && 
    (Object.values(users || {})[0].register_completed || false)
    const user = Object.values(users || {})[0] || { social: false }

    return (
      <ThemeProvider theme={styledTheme}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <Header isLoggedIn={isLoggedIn} />
              <Switch>
                <Route path="/product/:id" render={props => <Product products={products} {...props} />} />
                <Route exact path="/welcome" component={Welcome} />
                <Route exact path="/(signin|signup)" render={() => RedirectIf(isLoggedIn, user)} />
                <Route path="/:mode?" render={props => <Home products={products || {}} {...props} />} />
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