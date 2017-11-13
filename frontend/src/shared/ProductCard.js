import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Card, { CardActions, CardContent } from 'material-ui/Card'
import FavoriteIcon from 'material-ui-icons/Favorite'
import StarIcon from 'material-ui-icons/Star'
import Button from 'material-ui/Button'

import Image from 'shared/Image'
import Typography from 'shared/Typography'
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
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 16px 0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                type="headline"
                data-bold
                style={{ color: '#000' }}
              >
                {name}
              </Typography>
              <Typography
                type="display3"
                data-bold
                style={{ color: '#000' }}
              >
                {promotions[0].name}
              </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon style={{ marginBottom: 7, marginRight: 5 }}/>
              <Typography
                type="subheading"
                data-bold
              >
                {aggregate_rating.rating_value}
              </Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              type="display2"
              data-bold
              style={{ margin: '8px 8px 0 0', textDecoration: 'line-through' }}
            >
              {new Intl.NumberFormat().format(low_price)}원
            </Typography>
            <Typography
              type="display2"
              data-bold
              style={{ color: '#000', margin: '8px 0 0 0' }}
            >
              {new Intl.NumberFormat().format(high_price)}원
            </Typography>
          </div>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center', height: 42, padding: '4px' }}>
          <Button aria-label="favorite" style={{ color: '#fff', background: '#fb6542', flex: 1, borderRadius: 5 }}>
            <FavoriteIcon />
          </Button>
          <Button dense color="primary" style={{ flex: 1, height: 'calc(100% - 2px)', border: '1px solid grey', borderRadius: 5 }}>
            장바구니
          </Button>
        </CardActions>
      </Card>
    </StyledLink>
  )
}

Card.propTypes = {
  product: PropTypes.object,
}

export default ProductCard