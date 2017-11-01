import React from 'react'
import PropTypes from 'prop-types'

import Card, { CardActions, CardContent } from 'material-ui/Card'
import FavoriteIcon from 'material-ui-icons/Favorite'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'

import Image from 'shared/Image'
import Typography from 'shared/Typography'

const ProductCard = () => {
  return (
    <Card className="card" style={{ width: 300 }}>
      <Image 
        src={require('static/mac.jpg')}
        height={250}
      />
      <CardContent style={{ padding: '16px 16px 0 16px' }}>
        <Typography
          type="headline"
          bold
        >
          로로 2016 SS
        </Typography>
        <Typography
          type="display2"
          style={{ margin: '8px -10px 0 2px' }}
        >
          ￦ 16,900
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="favorite">
          <FavoriteIcon />
        </IconButton>
        <Button dense color="primary">
          장바구니에 담기
        </Button>
      </CardActions>
    </Card>
  )
}

Card.propTypes = {

}

export default ProductCard