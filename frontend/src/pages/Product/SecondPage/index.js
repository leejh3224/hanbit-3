import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import List, { ListItem } from 'material-ui/List'
import StarIcon from 'material-ui-icons/Star'
import WbCloudyIcon from 'material-ui-icons/WbCloudy'

import Review from './Review'

const FullList = styled(List)`
  &&{
    width: 100%;
    padding-top: 0;
  }
`

const StyledListItem = styled(ListItem)`
  && {
    background-color: #fff;
  }
`

const SecondPage = ({
  review,
}) => {
  const averageScore = (review.reduce((first, next) => {
    return first + next.review_rating
  }, 0) / review.length) || 0
  const stars = []
  for (let i = 0; i < averageScore; i++) {
    stars.push(<StarIcon />)
  }

  return (
    <FullList>
      <StyledListItem 
        style={{ 
          marginBottom: 8,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {stars}
        <p style={{ margin: '3px 0 0 8px' }}>{averageScore}점 ({review.length}명 참여)</p>
      </StyledListItem>
      {
        review.map(item => {
          return (
            <Review item={item} key={item.updatedAt} />
          )
        })
      }
      {
        !review.length && 
        <StyledListItem 
          style={{
            minHeight: 300,
            color: 'grey',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WbCloudyIcon style={{ width: 32, height: 32, marginBottom: 8 }}/>
          작성된 리뷰가 없습니다.
        </StyledListItem>
      }
    </FullList>
  )
}

SecondPage.propTypes = {
  review: PropTypes.array,
}

export default SecondPage