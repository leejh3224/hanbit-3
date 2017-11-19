import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import cookie from 'cookie'
import axios from 'axios'
import merge from 'lodash/merge'

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
import Order from 'pages/Order'

import RedirectIf from 'lib/RedirectIf'

class App extends Component {
  state = {
    users: null,
    products: null,
    cart: [{ '5a07141f5c5b343379e6165b': [{ '레드': 1 }] }],
  }
  componentWillMount() {
    const { user } = cookie.parse(document.cookie)

    if (user) {
      const getField = (str, index) => str.split(';')[index].split(":")[1].split("}")[0]
      const sid = getField(user, 0)
      const username = getField(user, 1)
      const isSocialUser = getField(user, 2) === 'yes'
      const register_completed = getField(user, 3) === 'yes'
      const address = getField(user, 4)
      const postcode = getField(user, 5)
      const phone = getField(user, 6)
      const name = getField(user, 7)

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
              address: `(${postcode}) ${address}`,
              phone,
              name,
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

  addToCart = (productId, quantityList) => {
    this.setState(prev => ({
      ...prev,
      cart: [
        ...prev.cart,
        {
          [productId]: quantityList,
        },
      ],
    }))
  }

  render() {
    const { users, products, cart } = this.state
    const { addToCart } = this
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
                <Route path="/order" render={props => cart.length ? <Order user={user} {...props} /> : <Redirect to="/" />} />
                <Route path="/product/:id" render={props => <Product products={products} cart={cart} addToCart={addToCart} {...props} />} />
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