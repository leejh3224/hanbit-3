import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui-icons/Search'

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ fullWidth, width }) => fullWidth ? '100%' : `${width}px`};
  @media(max-width: 30em) {
    width: ${({ fullWidth, width }) => fullWidth ? '100%' : `${width * 0.65}px`};
  }

  .search {
    width: ${({ width }) => width}px;
    @media(max-width: 30em) {
      width: ${({ width }) => width * 0.65}px;
    }
    input {
      text-indent: 25px;
    }
  }
`

const SearchInput = (props) => {
  return (
    <Wrapper {...props}>
      <SearchIcon
        style={{
          position: 'absolute',
          left: 0,
          top: 8
        }}
      />
      <TextField
        className="search"
        type="search"
        margin="dense"
        placeholder="Find here"
        fullWidth={props.fullWidth}
      />
    </Wrapper>
  )
}

SearchInput.propTypes = {
  width: PropTypes.number,
  fullWidth: PropTypes.bool,
}

export default SearchInput