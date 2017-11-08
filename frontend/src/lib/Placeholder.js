import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ImageIcon from 'material-ui-icons/Image'

const PlaceholderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ height }) => typeof height === 'string' ? height : `${height}px`};
  min-height: ${({ minHeight }) => minHeight}px;
`

const Placeholder = ({
  minHeight,
  height,
}) => {
  return (
    <PlaceholderWrapper height={height}>
      <ImageIcon style={{ color: 'grey', width: 50, height: 50 }} />
    </PlaceholderWrapper>
  )
}

Placeholder.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  minHeight: PropTypes.number,
}

export default Placeholder