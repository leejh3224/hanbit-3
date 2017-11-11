import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Template from '../Template'

const Product = ({
  match,
}) => {
  return (
    <Template>
      {match.params.id}
    </Template>
  )
}

Product.propTypes = {

}

export default Product