import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LazyLoader from 'lib/LazyLoader'

const StyledImage = styled.div`
  width: 100%;
  height: 100%;
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
        // min-height: 랜드스케이프 모드에서 최소 높이 보장
        height: typeof height === 'string' ? height : `${height}px`,
        minHeight: `${minHeight}px`,
      }}
    >
      {
        lazy ? (
          <LazyLoader height={height}>
            <StyledImage
              height={height}
              src={src}
            />
          </LazyLoader>
        ) : (
          <StyledImage
            height={height}
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