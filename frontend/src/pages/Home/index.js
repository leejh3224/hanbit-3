import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Template from '../Template'
import Hero from './Hero'

import ProductList from './ProductList'

/* landscape-mode */
const getHeight = window.innerHeight < 500 ? 
  300 : window.innerHeight * 0.5

const Home = () => {
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

}

export default Home