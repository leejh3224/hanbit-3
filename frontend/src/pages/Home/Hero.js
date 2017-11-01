import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Image from 'shared/Image'
import Typography from 'shared/Typography'

import TextField from 'material-ui/TextField'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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

  > .search {
    width: 27em;
    @media(max-width: 30em) {
      width: 16em;
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
        <Typography bold>You will feel better.</Typography>
        <TextField
          className="search"
          id="search"
          type="search"
          margin="normal"
          placeholder="Find here"
        />
      </Wrapper>
    </Image>
  )
}

Hero.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
}

export default Hero