import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'material-ui/Avatar'
import SentimentVeryDissatisfiedIcon from 'material-ui-icons/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from 'material-ui-icons/SentimentDissatisfied'
import SentimentNeutralIcon from 'material-ui-icons/SentimentNeutral'
import SentimentSatisfiedIcon from 'material-ui-icons/SentimentSatisfied'
import SentimentVerySatisfiedIcon from 'material-ui-icons/SentimentVerySatisfied'

import Wrapper from 'shared/Wrapper'
import Typography from 'shared/Typography'
import { ListItem } from 'shared/List'

import ReviewBody from './ReviewBody'

import { date } from 'lib/format'

const IconStyle = { width: 48, height: 48, color: '#000' }

const IconByRating = {
  1: <SentimentVeryDissatisfiedIcon style={IconStyle} />,
  2: <SentimentDissatisfiedIcon style={IconStyle} />,
  3: <SentimentNeutralIcon style={IconStyle} />,
  4: <SentimentSatisfiedIcon style={IconStyle} />,
  5: <SentimentVerySatisfiedIcon style={IconStyle}/>,
}

const Review = ({
  item,
}) => {
  const { 
    author, 
    review_body, 
    review_rating, 
    updatedAt 
  } = item

  return (
    <ListItem divider >
      <Avatar>
        {IconByRating[review_rating]}
      </Avatar>
      <Wrapper
        column="true"
        marginleft={2}
      >
        <Typography>
          {author.replace(/.{3}$/,'***')}
        </Typography>
        <ReviewBody text={review_body} />
        <Typography>
          {date(updatedAt)}
        </Typography>
      </Wrapper>
    </ListItem>
  )
}

Review.propTypes = {
  item: PropTypes.object,
}

export default Review