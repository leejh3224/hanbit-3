import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ImageIcon from 'material-ui-icons/Image'

const PlaceholderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: inherit;
`

const Placeholder = ({
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
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
}

export default Placeholder