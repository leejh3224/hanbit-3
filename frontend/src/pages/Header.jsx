import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import SearchIcon from 'material-ui-icons/Search'
import LockOpenIcon from 'material-ui-icons/LockOpen'
import PersonOutlineIcon from 'material-ui-icons/PersonOutline'

import AppBar from 'shared/AppBar'
import AppDrawer from 'shared/AppDrawer'
import Typography from 'shared/Typography'
import FullScreenDialog from 'shared/FullScreenDialog'
import Link from 'shared/Link'

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

const MenuButton = ({
  onClick,
}) => (
  <IconButton 
    aria-label="Menu"
    onClick={onClick}
  >
    <MenuIcon />
  </IconButton>
)


class Header extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }
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
    
    /* 
     * 로컬 로그인의 경우에는 history.push로부터 상태를 전달받고,
     * 소셜 로그인의 경우 App 컴포넌트에서 cookie를 읽어서 전달
     */
    const { open } = this.state
    const { isLoggedIn } = this.props
    const { handleClickOpen, handleRequestClose } = this

    return (
      <AppBar 
        background="white"
        boxshadow="none"
      >
        <Toolbar disableGutters>
          <AppDrawer 
            Trigger={MenuButton}
          />
          <Typography 
            type="headline"
            marginleft={1.5}
            margintop={0.5}
          >
            <Link to="/">
              Hanbit
            </Link>
          </Typography>
          {/* filling up space */}
          <div style={{ flex: 1 }} />
          <FullScreenDialog
            fullScreen
            name={'Search'}
            action={'BACK'}
            Trigger={SearchButton}
            open={open}
            handleClickOpen={handleClickOpen}
            handleRequestClose={handleRequestClose}
          />
          {
            isLoggedIn ? (
              <a href="http://127.0.0.1:8080/users/logout">
                <IconButton aria-label="LockOpen">
                  <LockOpenIcon />
                </IconButton>
              </a>
            ) : (
              <Link to="/signin">
                <IconButton aria-label="PersonOutline">
                  <PersonOutlineIcon />
                </IconButton>
              </Link>
            )
          }
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(Header)