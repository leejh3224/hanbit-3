import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'material-ui/Button'

import Typography from 'shared/Typography'

import { visibilityEnhancer } from 'lib/enhancer'

const Wrapper = styled.div``

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
      <Typography>
        {isVisible ? text.slice(0, 200): text}
      </Typography>
      {
        isLongText &&
        <StyledButton
          onClick={
            () => isVisible ? 
            setVisibility(false) : setVisibility(true)
          }
        >{isVisible ? '더보기' : '접기'}</StyledButton>
      }
    </Wrapper>
  )
}

ReviewBody.propTypes = {
  text: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired,
}

export default visibilityEnhancer(
  // initial state
  ({ text }) => text.length >= 200,
)(ReviewBody)