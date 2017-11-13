import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import SentimentVeryDissatisfiedIcon from 'material-ui-icons/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from 'material-ui-icons/SentimentDissatisfied'
import SentimentNeutralIcon from 'material-ui-icons/SentimentNeutral'
import SentimentSatisfiedIcon from 'material-ui-icons/SentimentSatisfied'
import SentimentVerySatisfiedIcon from 'material-ui-icons/SentimentVerySatisfied'

import ReviewBody from './ReviewBody'

const Wrapper = styled(ListItem)`
  && {
    background-color: #fff;
  }
`

const MediaRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  align-items: start;
`

const MediaRightText = styled(ListItemText)`
  && {
    padding: 0;
  }
`

const IconStyle = { width: 48, height: 48, color: '#000' }

const IconByRating = {
  1: <SentimentVeryDissatisfiedIcon style={IconStyle} />,
  2: <SentimentDissatisfiedIcon style={IconStyle} />,
  3: <SentimentNeutralIcon style={IconStyle} />,
  4: <SentimentSatisfiedIcon style={IconStyle} />,
  5: <SentimentVerySatisfiedIcon style={IconStyle}/>,
}

const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false,
  timeZone: 'Asia/Seoul',
}

const Review = ({
  item,
}) => {
  const { author, review_body, review_rating, updatedAt } = item

  return (
    <Wrapper divider key={updatedAt}>
      <Avatar key={author}>
        {IconByRating[review_rating]}
      </Avatar>
      <MediaRight>
        <MediaRightText
          secondary={author.replace(/.{3}$/,'***')}
          style={{ padding: 0}}
        />
        <ReviewBody text={review_body} />
        <MediaRightText
          secondary={new Intl.DateTimeFormat('ko-KR', options).format(new Date(updatedAt))}
          style={{ padding: 0}}
        />
      </MediaRight>
    </Wrapper>
  )
}

Review.propTypes = {
  item: PropTypes.object,
}

export default Review