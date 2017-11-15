import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Image from 'shared/Image'
import Typography from 'shared/Typography'

import SearchInput from 'shared/SearchInput'

const Wrapper = styled.div`
  width: 100%;
  min-height: inherit;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    font-size: 3em;
    @media(max-width: 30em) {
      font-size: 2em;
    }
  }
`

const Hero = ({
  src,
  height,
}) => {
  return (
    <Image
      src={src}
      height={height}
    >
      <Wrapper>
        <Typography
          type="subheading"
          bold="true"
        >You will feel better.</Typography>
        <SearchInput
          width={350}
        />
      </Wrapper>
    </Image>
  )
}

Hero.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
}

export default Hero