import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Card, { CardActions, CardContent } from 'material-ui/Card'
import FavoriteIcon from 'material-ui-icons/Favorite'
import StarIcon from 'material-ui-icons/Star'

import Image from 'shared/Image'
import Typography from 'shared/Typography'
import { PrimaryButton, WhiteButton } from 'shared/Button'
import Link from 'shared/Link'

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
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                type="headline"
                bold="true"
                style={{ color: '#000' }}
              >
                {name}
              </Typography>
              <Typography
                type="display3"
                bold="true"
                style={{ color: '#000' }}
              >
                {promotions[0].name}
              </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon style={{ marginBottom: 7, marginRight: 5 }}/>
              <Typography
                type="subheading"
                bold="true"
              >
                {aggregate_rating.rating_value}
              </Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              type="display2"
              bold="true"
              style={{ margin: '8px 8px 0 0', textDecoration: 'line-through' }}
            >
              {new Intl.NumberFormat().format(low_price)}원
            </Typography>
            <Typography
              type="display2"
              bold="true"
              style={{ color: '#000', margin: '8px 0 0 0' }}
            >
              {new Intl.NumberFormat().format(high_price)}원
            </Typography>
          </div>
        </StyledCardContent>
        <StyledCardActions>
          <PrimaryButton flex="true" style={{ height: 36 }}>
            <FavoriteIcon />
          </PrimaryButton>
          <WhiteButton flex="true">
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