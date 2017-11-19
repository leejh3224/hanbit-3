import React from 'react'
import PropTypes from 'prop-types'

import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'

import Wrapper from 'shared/Wrapper'
import Typography from 'shared/Typography'
import Image from 'shared/Image'
import { ListItem } from 'shared/List'
import { RoundButton } from 'shared/Button'

import { currency } from 'lib/format'

const RelatedProduct = ({
  related,
}) => {
  const {
    name,
    low_price,
    image,
  } = related

  return (
    <ListItem 
      divider
      padding={0}
    >
      <Image 
        src={image[0]} 
        height={160} 
        lazy 
      />
      <Wrapper
        position="relative"
        padding={2}
        column="true"
        justifycontent="center"
        fullwidth="true"
        height={160}
      >
        <Typography
          type="display1"
          marginbottom={1}
        >{name}</Typography>
        <Typography
          type="display3"
        >{currency(low_price)}</Typography>
        <RoundButton
          diameter={32}
          position="absolute"
          bottom={2}
          right={2}
        >
          <ShoppingCartIcon style={{ color: '#fff' }} />
        </RoundButton>
      </Wrapper>
    </ListItem>
  )
}

RelatedProduct.propTypes = {

}

export default RelatedProduct