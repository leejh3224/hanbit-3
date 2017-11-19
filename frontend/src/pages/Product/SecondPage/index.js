import React from 'react'
import PropTypes from 'prop-types'

import StarIcon from 'material-ui-icons/Star'
import WbCloudyIcon from 'material-ui-icons/WbCloudy'

import List, { ListItem } from 'shared/List'
import Typography from 'shared/Typography'

import Review from './Review'

const SecondPage = ({
  review,
}) => {

  // 별점
  const averageScore = (review.reduce((first, next) => {
    return first + next.review_rating
  }, 0) / review.length) || 0
  const stars = []
  for (let i = 0; i < averageScore; i++) {
    stars.push(<StarIcon />)
  }

  return (
    <List column="true">
      <ListItem
        justifycontent="center"
        marginbottom={1}
      >
        {stars}
        <Typography
          type="display2"
          margintop={0.5}
        >
          {averageScore}점 ({review.length}명 참여)
        </Typography>
      </ListItem>
      {
        review.map(item => {
          return (
            <Review item={item} key={item.author} />
          )
        })
      }
      {
        !review.length && 
        <ListItem
          height={300}
          color="grey"
          column="true"
          alignitems="center"
          justifycontent="center"
        >
          <WbCloudyIcon style={{ width: 32, height: 32, marginBottom: 8 }}/>
          작성된 리뷰가 없습니다.
        </ListItem>
      }
    </List>
  )
}

SecondPage.propTypes = {
  review: PropTypes.array,
}

export default SecondPage