import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Template from '../Template'
import Hero from './Hero'

import ProductList from './ProductList'

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
        height={'40vh'}
      />
      <ProductList />
    </Template>
  )
}

Home.propTypes = {
  match: PropTypes.object,
}

export default withRouter(Home)