import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import Placeholder from './Placeholder'
import FadeIn from './animation/FadeIn'

const LazyLoader = ({
  height,
  children,
}) => {
  return (
    <LazyLoad
      height={height}
      placeholder={<Placeholder height={height} />}
      debounce={300}
      once
    >
      <FadeIn>
      { children }
      </FadeIn>
    </LazyLoad>
  )
}

LazyLoader.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  children: PropTypes.object.isRequired,
}

export default LazyLoader