import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ListItem } from 'material-ui/List'
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'

import Typography from 'shared/Typography'
import Image from 'shared/Image'
import { RoundButton } from 'shared/Button'

const StyledListItem = styled(ListItem)`
  && {
    display: flex;
    background-color: #fff;
    padding-top: 0;
    padding-bottom: 0;
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
    <StyledListItem
      divider
      disableGutters
    >
      <Image src={image[0]} height={160} lazy />
      <div style={{ minWidth: '50%', padding: 16 }}>
        <Typography
          type="display1"
          style={{ color: '#000' }}
        >{name}</Typography>
        <Typography
          type="display3"
        >{new Intl.NumberFormat().format(low_price)}원</Typography>
        <RoundButton
          absolute="true"
          diameter={32}
          bottom={16}
          right={16}
        >
          <ShoppingCartIcon style={{ color: '#fff' }} />
        </RoundButton>
      </div>
    </StyledListItem>
  )
}

RelatedProduct.propTypes = {

}

export default RelatedProduct