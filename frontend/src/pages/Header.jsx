import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Link,
  withRouter
} from 'react-router-dom'

import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import SearchIcon from 'material-ui-icons/Search'
import PersonOutlineIcon from 'material-ui-icons/PersonOutline'

import AppBar from 'shared/AppBar'
import Typography from 'shared/Typography'
import FullScreenDialog from 'shared/FullScreenDialog'
import SearchInput from 'shared/SearchInput'

const SearchButton = ({
  onClick,
}) => (
  <Link to="/search">
    <IconButton 
      aria-label="Search"
      onClick={onClick}
    >
      <SearchIcon />
    </IconButton>
  </Link>
)

class Header extends Component {
  constructor(props) {
    super(props)
    /* 만약 유저가 /search로 들어오면 dialog를 보여줌 */
    const searching = props.location.pathname === '/search'
    this.state ={
      open: searching,
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    const { history } = this.props
    this.setState({ open: false })
    history.goBack()
  }

  render() {
    const { open } = this.state
    const { handleClickOpen, handleRequestClose } = this
    return (
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
          <FullScreenDialog
            name={'Search'}
            action={'BACK'}
            body={<SearchInput fullWidth />}
            Trigger={SearchButton}
            open={open}
            handleClickOpen={handleClickOpen}
            handleRequestClose={handleRequestClose}
          />
          <Link to="/login">
            <IconButton aria-label="PersonOutline">
              <PersonOutlineIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(Header)