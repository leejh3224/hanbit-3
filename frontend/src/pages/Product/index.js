import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Template from '../Template'
import TabBar from 'shared/TabBar'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import ThirdPage from './ThirdPage'

const Wrapper = styled.div`
  padding-top: 64px;
`

const Product = ({
  match,
  products,
}) => {
  if (!products) {
    return <p>Loading...</p>
  }
  const matchedProduct = products[match.params.id]
  const {
    review,
    related,
  } = matchedProduct

  return (
    <Template>
      <Wrapper>
        <TabBar
          names={{
            "상품 정보": { withBadge: false },
            "리뷰": { withBadge: true, count: review.length },
            "관련 상품": { withBadge: true, count: related.length },
          }}
        >
          <FirstPage product={matchedProduct} />
          <SecondPage review={review} />
          <ThirdPage related={related} />
        </TabBar>
      </Wrapper>
    </Template>
  )
}

Product.propTypes = {

}

export default Product