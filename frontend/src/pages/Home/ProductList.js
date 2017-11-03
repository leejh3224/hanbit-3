import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ProductCard from 'shared/ProductCard'
import Typography from 'shared/Typography'

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
  > .card {
    flex: 1;
    min-width: 280px;
    margin: ${({ theme }) => theme.spacing * 1}px;
  }
`

const ProductList = () => {
  return (
    <Wrapper>
      <Typography
          type="subheading"
          bold
      >What's New</Typography>
      <div className="decorator" />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Wrapper>
  )
}

ProductList.propTypes = {

}

export default ProductList