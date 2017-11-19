import React from 'react'
import PropTypes from 'prop-types'

import InfoIcon from 'material-ui-icons/Info'

import Wrapper from 'shared/Wrapper'
import List, { ListItem } from 'shared/List'
import Carousel from 'shared/Carousel'
import Typography from 'shared/Typography'
import CollapsibleListItem from 'shared/CollapsibleListItem'

import BasicInfo from './BasicInfo'

import { color } from 'lib/styledTheme'

/*
 * "할인 행사 이름": {
 *  "available_until": "기간",
 *  "name": "이름"
 * }
 * 오브젝트 생성
 */
const mapArray = (promotions) => ({

  // 부모 탭
  "할인 정보": { 
    withIcon: true, 
    icon: <InfoIcon style={{ color: color.grey }} />
  },

  // 자식 탭
  ...promotions.reduce((obj, v) => {
    obj[v.name] = v
    return obj
  }, {})
})

const FirstPage = ({
  product,
}) => {
  const {
    image,
    description,
    stock_keeping_unit,
    promotions,
  } = product

  return (
    <Wrapper column="true">
      <Carousel
        images={image}
        height={400}
      />
      <List column="true">
        <BasicInfo product={product} />
        <ListItem divider>
          <Typography type="display1">
            잔여 수량: {stock_keeping_unit}개
          </Typography>
        </ListItem>
        <CollapsibleListItem 
          labels={mapArray(promotions)} 
        />
        <ListItem            
          column="true"
          alignitems="start"
          height={180}
          margintop={1}
          paddingbottom={6}
        >
          <Typography
            type="display1"
            marginbottom={1}
          >
            상세설명
          </Typography>
          <Typography
            type="display2"
          >{description}</Typography>
        </ListItem>
      </List>
    </Wrapper>
  )
}

FirstPage.propTypes = {
  product: PropTypes.object,
}

export default FirstPage