import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LazyLoader from 'lib/LazyLoader'

const StyledImage = styled.div`
  width: 100%;
  height: ${({ height }) => height}px;
  background-image: ${({ src }) => `url(${ src })`};
  background-size: cover;
  background-position: center;
`

const Image = ({
  src,
  height,
  lazy,
  children,
}) => {
  return (
    <div>
      {
        lazy ? (
          <LazyLoader height={height}>
            <StyledImage height={height} src={src} />
          </LazyLoader>
        ) : (
          <StyledImage height={height} src={src}>
            { children }
          </StyledImage>
        )
      }
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  lazy: PropTypes.bool,
}

export default Image