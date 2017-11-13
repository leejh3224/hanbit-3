import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withState } from 'recompose'

import { ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'

const Wrapper = styled.div``

const MediaRightText = styled(ListItemText)`
  && {
    padding: 0;
  }
`

const StyledButton = styled(Button)`
  && {
    padding: 0;
    min-width: auto;
  }
`

const enhance = compose(
  withState('isTextHidden', 'setTextVisibility', ({ text }) => text.length >= 200),
)

const ReviewBody = ({
  text,
  isTextHidden,
  setTextVisibility,
}) => {
  const isLongText = text.length >= 200
  return (
    <Wrapper>
      <MediaRightText
        secondary={
          isTextHidden ? text.slice(0, 200): text
        }
        style={{ padding: 0 }}
      />
      {
        isLongText &&
        <StyledButton
          onClick={
            () => isTextHidden ? 
            setTextVisibility(false) : setTextVisibility(true)
          }
          style={{ padding: 0 }}
        >{isTextHidden ? '더보기' : '접기'}</StyledButton>
      }
    </Wrapper>
  )
}

ReviewBody.propTypes = {
  text: PropTypes.string.isRequired,
  isTextHidden: PropTypes.bool.isRequired,
  setTextVisibility: PropTypes.func.isRequired,
}

export default enhance(ReviewBody)