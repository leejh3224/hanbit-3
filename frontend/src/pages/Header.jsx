import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import SearchIcon from 'material-ui-icons/Search'
import PersonOutlineIcon from 'material-ui-icons/PersonOutline'

import AppBar from 'shared/AppBar'
import Typography from 'shared/Typography'

const Wrapper = styled.div`
  width: 100%;
  background-color: RGBA(0, 0, 0, 0.3);
`

const Header = () => {
  return (
    <Wrapper>
      <AppBar>
        <Toolbar disableGutters>
          <IconButton aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography 
            type="headline"
            bold
            style={{ marginLeft: 12, marginTop: 3 }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
              Hanbit
            </Link>
          </Typography>
          {/* filling up space */}
          <div style={{ flex: 1 }} />
          <IconButton aria-label="Search">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="PersonOutline">
            <PersonOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Wrapper>
  )
}

Header.propTypes = {

}

export default Header