import React from 'react'
import PropTypes from 'prop-types'

import FavoriteIcon from 'material-ui-icons/Favorite'

import Wrapper from 'shared/Wrapper'
import { ListItem } from 'shared/List'
import Typography from 'shared/Typography'
import { RoundButton } from 'shared/Button'

import { currency } from 'lib/format'

const BasicInfo = ({
  product,
}) => {
  const {
    name,
    low_price,
    high_price,
  } = product

  return (
    <ListItem
      relative="true"
      column="true"
      alignitems="start"
      divider
    >
      <Typography 
        type="display1"
        maxwidth="calc(100% - 58px)"
        marginbottom={1}
      >{name}</Typography>
      <Wrapper alignitems="center">
        <Typography
          type="display3"
          bold="true"
          color="grey"
          marginright={1}
          style={{ textDecoration: 'line-through' }}
        >
          {currency(high_price)}
        </Typography>
        <Typography
          type="display2"
          bold="true"
          color="primary"
        >
          {currency(low_price)}
        </Typography>
      </Wrapper>
      <RoundButton
        diameter={42}
        position="absolute"
        bottom={2}
        right={2}
      >
        <FavoriteIcon style={{ color: '#fff' }} />
      </RoundButton>
    </ListItem>
  )
}

BasicInfo.propTypes = {

}

export default BasicInfo