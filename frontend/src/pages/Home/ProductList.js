import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ProductCard from 'shared/ProductCard'
import Typography from 'shared/Typography'
import TabBar from 'shared/TabBar'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 ${({ theme }) => theme.spacing * 1}px;

  > h3 {
    width: 100%;
    padding: ${({ theme }) => theme.spacing * 2}px;
    padding-left: ${({ theme }) => theme.spacing * 1}px;
    margin-bottom: ${({ theme }) => `-${theme.spacing * 2}`}px;
  }
  .decorator {
    width: ${({ theme }) => theme.spacing * 7}px;
    margin: ${({ theme }) => 
    `0 calc(100% - ${theme.spacing * 10}px) 
    ${theme.spacing * 2}px ${theme.spacing * 1}px`};
    border-bottom: 5px solid black;
  }

  @media(max-width: 40em) {
    padding: 8px;
  }
`

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const List = ({
  products,
}) => (
  <ListWrapper>
  {
    Object.values(products)
    .map(product => <ProductCard key={product._id} product={product} />) 
  }
  </ListWrapper>
)

const ProductList = (
  props,
) => {
  return (
    <Wrapper>
      <Typography
        type="subheading"
        data-bold
      >What's New</Typography>
      <div className="decorator" />
      <TabBar
        names={{
          "이 주의 특가": { withBadge: false },
          "가을 신상": { withBadge: false },
          "핫한 신상": { withBadge: false },
          "신상신상": { withBadge: false },
          "가을 가을": { withBadge: false },
          "핫해핫해": { withBadge: false },
          "show a": { withBadge: false },
        }}
      >
        <List {...props} />
        <List {...props} />
        <List {...props} />
        <List {...props} />
        <List {...props} />
        <List {...props} />
        <p>a</p>
      </TabBar>
    </Wrapper>
  )
}

ProductList.propTypes = {

}

export default ProductList