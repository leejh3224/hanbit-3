import React, { Component } from 'react'
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

class ProductList extends Component {
  static propTypes = {}
  state = {
    value: 0
  }
  handleChange = (e, value) => {
    this.setState({ value })
  }
  render() {
    const { value } = this.state
    const { products } = this.props
    const { handleChange } = this

    return (
      <Wrapper>
        <Typography
            type="subheading"
            data-bold
        >What's New</Typography>
        <div className="decorator" />
        <TabBar
          value={value}
          handleChange={handleChange}
        >
          { 
            Object.values(products)
            .map(product => <ProductCard key={product._id} product={product} />) 
          }
        </TabBar>
      </Wrapper>
    )
  }
}

ProductList.propTypes = {

}

export default ProductList