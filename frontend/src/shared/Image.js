import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LazyLoader from 'lib/LazyLoader'

const StyledImage = styled.div`
  width: 100%;
  // string type: x%, number type: pixel
  height: ${({ height }) => typeof height === 'string' ? height : `${height}px`};
  min-height: ${({ minHeight }) => minHeight}px;
  background-image: ${({ src }) => `url(${ src })`};
  background-size: cover;
  background-position: center;
`

const Image = ({
  src,
  height,
  minHeight,
  lazy,
  children,
}) => {
  return (
    <div
      style={{

        // string type: x%, number type: pixel
        maxHeight: typeof height === 'number' && '100%',
        height: typeof height === 'string' && '100%',
      }}
    >
      {
        lazy ? (
          <LazyLoader height={height}>
            <StyledImage
              height={height}
              minHeight={minHeight}
              src={src}
            />
          </LazyLoader>
        ) : (
          <StyledImage
            height={height}
            minHeight={minHeight}
            src={src}
          >
            {children}
          </StyledImage>
        )
      }
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  minHeight: PropTypes.number,
  lazy: PropTypes.bool,
  children: PropTypes.element,
}

export default Image