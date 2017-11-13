import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ListItem } from 'material-ui/List'
import Button from 'material-ui/Button'
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'

import Typography from 'shared/Typography'
import Image from 'shared/Image'

const StyledListItem = styled(ListItem)`
  && {
    display: flex;
    background-color: #fff;
    padding-top: 0;
    padding-bottom: 0;
  }
`

const StyledButton = styled(Button)`
  && {
    box-shadow: none;
    position: absolute;
    width: 36px;
    height: 36px;
    right: 16px;
    bottom: 16px;
    background: #fb6542;
  }
`

const RelatedProduct = ({
  related,
}) => {
  const {
    name,
    low_price,
    image,
  } = related
  return (
    <StyledListItem divider disableGutters>
      <Image src={image[0]} height={120} lazy />
      <div style={{ minWidth: 200, padding: 16 }}>
        <Typography
          type="display1"
          style={{ color: '#000' }}
        >{name}</Typography>
        <Typography
          type="display3"
        >{new Intl.NumberFormat().format(low_price)}원</Typography>
        <StyledButton fab>
          <ShoppingCartIcon style={{ color: '#fff' }} />
        </StyledButton>
      </div>
    </StyledListItem>
  )
}

RelatedProduct.propTypes = {

}

export default RelatedProduct