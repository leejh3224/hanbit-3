import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import List, { ListItem } from 'material-ui/List'
import Button from 'material-ui/Button'
import FavoriteIcon from 'material-ui-icons/Favorite'
import InfoIcon from 'material-ui-icons/Info'

import Carousel from 'shared/Carousel'
import Typography from 'shared/Typography'
import CollapsibleListItem from 'shared/CollapsibleListItem'

const Wrapper = styled.div``

const StyledListItem = styled(ListItem)`
  && {
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: #fff;
  }
`

const StyledButton = styled(Button)`
  && {
    box-shadow: none;
    position: absolute;
    right: 16px;
    bottom: 12px;
  }
`

const FirstPage = ({
  product,
}) => {
  const {
    image,
    name,
    low_price,
    high_price,
    description,
    stock_keeping_unit,
    promotions,
  } = product

  return (
    <Wrapper>
      {/* first page */}
      <Carousel
        images={image}
        height={400}
      />
      <List style={{ paddingTop: 0 }}>
        <StyledListItem style={{ position: 'relative' }} divider>
          <Typography type="subheading">{name}</Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              type="display1"
              data-bold
              style={{ color: '#fb6542', marginRight: 8 }}
            >
              {Math.round(((high_price - low_price) / high_price) * 100)}%
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                type="display3"
                data-bold
                style={{ textDecoration: 'line-through' }}
              >
                {new Intl.NumberFormat().format(low_price)}원
              </Typography>
              <Typography
                type="display1"
                data-bold
                style={{ color: '#000' }}
              >
                {new Intl.NumberFormat().format(high_price)}원
              </Typography>
            </div>
          </div>
          <StyledButton fab>
            <FavoriteIcon style={{ color: '#fff' }} />
          </StyledButton>
        </StyledListItem>
        <StyledListItem divider>
          <Typography
            type="display1"
            style={{ color: '#000' }}
          >
            잔여 {stock_keeping_unit}개
          </Typography>
        </StyledListItem>
        <CollapsibleListItem 
          labels={{
            "할인 정보": { withIcon: true, icon: <InfoIcon style={{ color: '#e0e0e0' }} />},
            ...promotions.reduce((obj, v) => {
              obj[v.name] = v
              return obj
            }, {})
          }} 
        />
        <StyledListItem style={{ marginTop: 8 }}>
          <Typography
            type="headline"
            style={{ borderBottom: '3px solid #000' }}
          >상세설명</Typography>
          <Typography
            type="display2"
            style={{ color: '#000', marginTop: 8 }}
          >{description}</Typography>
        </StyledListItem>
      </List>
    </Wrapper>
  )
}

FirstPage.propTypes = {
  product: PropTypes.object,
}

export default FirstPage