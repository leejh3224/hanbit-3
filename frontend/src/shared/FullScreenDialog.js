import React from 'react'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'

import AppBar from './AppBar'
import Typography from './Typography'

import Wrapper from 'shared/Wrapper'
import SearchInput from 'shared/SearchInput'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const FullScreenDialog = ({
  Trigger,
  name,
  action,
  open,
  handleClickOpen,
  handleRequestClose,
  fullScreen,
}) => {
  return (
    <Wrapper column="true">
      <Trigger onClick={handleClickOpen} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onRequestClose={handleRequestClose}
        transition={Transition}
      >
        <AppBar
          background="lightWhite"
          borderbottom="1px solid grey"
          boxshadow="none"
        >
          <Toolbar disableGutters>
            <IconButton
              onClick={handleRequestClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              type="headline"
              bold="true"
              flex={1}
              margintop={0.5}
              marginleft={1.5}
            >{name}</Typography>
            <Button onClick={handleRequestClose}>
              {action}
            </Button>
          </Toolbar>
        </AppBar>
        <Wrapper
          margintop={4}
          padding={4}
        >
          <SearchInput fullWidth />
        </Wrapper>
      </Dialog>
    </Wrapper>
  )
}

FullScreenDialog.propTypes = {
  Trigger: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
}

export default FullScreenDialog