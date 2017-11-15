import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Template from '../Template'
import Hero from './Hero'
import ProductList from './ProductList'

import config from 'config'

const Home = ({
  match,
  products,
}) => {
  const { static_url } = config
  const { mode } = match.params
  if (mode && mode !== 'search') {
    return <p>NOT FOUND</p>
  }
  return (
    <Template>
      <Hero
        src={`${static_url}/etc/back.jpg`}
        height={260}
      />
      <ProductList products={products} />
    </Template>
  )
}

Home.propTypes = {
  match: PropTypes.object,
}

export default withRouter(Home)