import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'

import { visibilityEnhancer } from 'lib/enhancer'

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

const ReviewBody = ({
  text,
  isVisible,
  setVisibility,
}) => {
  const isLongText = text.length >= 200
  return (
    <Wrapper>
      <MediaRightText
        secondary={
          isVisible ? text.slice(0, 200): text
        }
        style={{ padding: 0 }}
      />
      {
        isLongText &&
        <StyledButton
          onClick={
            () => isVisible ? 
            setVisibility(false) : setVisibility(true)
          }
          style={{ padding: 0 }}
        >{isVisible ? '더보기' : '접기'}</StyledButton>
      }
    </Wrapper>
  )
}

ReviewBody.propTypes = {
  text: PropTypes.string.isRequired,
  isTextHidden: PropTypes.bool.isRequired,
  setTextVisibility: PropTypes.func.isRequired,
}

export default visibilityEnhancer(
  // initial state
  ({ text }) => text.length >= 200,
)(ReviewBody)