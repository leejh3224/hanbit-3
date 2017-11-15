import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LazyLoader from 'lib/LazyLoader'

const StyledImage = styled.div`
  width: 100%;
  min-height: inherit;
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
  const ImageStyle = {
    
    // string type: x%, number type: pixel
    // min-height: 랜드스케이프 모드에서 최소 높이 보장
    width: '100%',
    minHeight: typeof height === 'string' ? height : `${height}px`,
  }
  return (
    <div style={ImageStyle}>
      {
        lazy ? (
          <LazyLoader height={height}>
            <StyledImage src={src}>
              {children}
            </StyledImage>
          </LazyLoader>
        ) : (
          <StyledImage src={src}>
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
  lazy: PropTypes.bool,
  children: PropTypes.element,
}

export default Image