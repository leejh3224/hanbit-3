import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Template from '../Template'
import Hero from './Hero'

import ProductList from './ProductList'

/* landscape-mode */
const getHeight = window.innerHeight < 500 ? 
  300 : window.innerHeight * 0.5

const Home = ({
  match,
}) => {
  const { mode } = match.params
  if (mode && mode !== 'search') {
    return <p>NOT FOUND</p>
  }
  return (
    <Template>
      <Hero
        src={require('static/back.jpg')}
        height={getHeight}
      />
      <ProductList />
    </Template>
  )
}

Home.propTypes = {
  match: PropTypes.object,
}

export default withRouter(Home)