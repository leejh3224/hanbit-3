import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import Placeholder from './Placeholder'
import FadeIn from './animation/FadeIn'

const LazyLoader = ({
  height,
  minHeight,
  children,
}) => {
  return (
    <LazyLoad
      placeholder={<Placeholder height={height} minHeight={minHeight} />}
      debounce={300}
      once
    >
      <FadeIn height={height} minHeight={minHeight}>
      { children }
      </FadeIn>
    </LazyLoad>
  )
}

LazyLoader.propTypes = {
  height: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
}

export default LazyLoader