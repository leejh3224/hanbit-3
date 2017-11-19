import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from 'shared/Wrapper'
import TabBar from 'shared/TabBar'

import Template from '../Template'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import ThirdPage from './ThirdPage'
import Footer from './Footer'

const Product = ({
  match,
  history,
  products,
  cart,
  addToCart,
}) => {
  if (!products) {
    return <p>Loading...</p>
  }
  const matchedProduct = products[match.params.id]
  const {
    review,
    related,
    options,
  } = matchedProduct

  return (
    <Template>
      <Wrapper
        column="true"
        paddingtop={8}
      >
        <TabBar
          flex="true"
          names={{
            "상품 정보": { withBadge: false },
            "리뷰": { withBadge: true, count: review.length },
            "관련 상품": { withBadge: false },
          }}
        >
          <FirstPage product={matchedProduct} />
          <SecondPage review={review} />
          <ThirdPage related={related} />
        </TabBar>
      </Wrapper>
      <Footer
        history={history}
        product={matchedProduct}
        options={options} 
        cart={cart}
        addToCart={addToCart}
      />
    </Template>
  )
}

Product.propTypes = {

}

export default Product