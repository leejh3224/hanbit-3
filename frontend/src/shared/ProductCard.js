import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Card, { CardActions, CardContent } from 'material-ui/Card'
import FavoriteIcon from 'material-ui-icons/Favorite'
import StarIcon from 'material-ui-icons/Star'

import Wrapper from 'shared/Wrapper'
import Image from 'shared/Image'
import Typography from 'shared/Typography'
import { PrimaryButton, WhiteButton } from 'shared/Button'
import Link from 'shared/Link'

import { currency } from 'lib/format'

const StyledLink = styled(Link)`
  && {
    flex: 1;
    min-width: 280px;
    max-width: 450px;
    margin: ${({ theme }) => theme.spacing * 1}px;

    @media(max-width: 40em) {
      margin: ${({ theme }) => `${theme.spacing * 1}px 0 ${theme.spacing * 1}px 0`};
    }
  }
`

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  padding-bottom: 0;
`

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: center;
  padding: 4px;
`

const ProductCard = ({
  product,
}) => {
  const {
    _id,
    name,
    image,
    high_price,
    low_price,
    promotions,
    aggregate_rating,
  } = product

  return (
    <StyledLink to={`/product/${_id}`}>
      <Card>
        <Image 
          src={image[0]}
          height={220}
          lazy
        />
        <StyledCardContent>
          <Wrapper
            fullwidth
            justifycontent="space-between"
          >
            <Wrapper column="true">
              <Typography
                type="display1"
                marginbottom={1}
              >
                {name}
              </Typography>
              <Typography
                type="display3"
              >
                {promotions[0].name}
              </Typography>
            </Wrapper>
            <Wrapper alignitems="center">
              <StarIcon style={{ marginBottom: 7, marginRight: 5 }}/>
              <Typography
                type="subheading"
                bold="true"
                color="primary"
              >
                {aggregate_rating.rating_value}
              </Typography>
            </Wrapper>
          </Wrapper>
          <Wrapper justifycontent="center">
            <Typography
              type="display2"
              bold="true"
              color="grey"
              margintop={1}
              marginright={1}
              style={{ textDecoration: 'line-through' }}
            >
              {currency(high_price)}
            </Typography>
            <Typography
              type="display2"
              bold="true"
              color="primary"
              margintop={1}
            >
              {currency(low_price)}
            </Typography>
          </Wrapper>
        </StyledCardContent>
        <StyledCardActions>
          <PrimaryButton marginright={1}>
            <FavoriteIcon />
          </PrimaryButton>
          <WhiteButton>
            장바구니
          </WhiteButton>
        </StyledCardActions>
      </Card>
    </StyledLink>
  )
}

Card.propTypes = {
  product: PropTypes.object,
}

export default ProductCard