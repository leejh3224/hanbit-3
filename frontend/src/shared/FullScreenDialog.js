import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'

import AppBar from './AppBar'
import Typography from './Typography'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const BodyWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing * 5}px;
  margin-top: ${({ theme }) => theme.spacing * 8}px;
`

const FullScreenDialog = ({
  Trigger,
  name,
  action,
  body,
  open,
  handleClickOpen,
  handleRequestClose,
  fullScreen,
}) => {
  return (
    <div>
      <Trigger onClick={handleClickOpen} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onRequestClose={handleRequestClose}
        transition={Transition}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              onClick={handleRequestClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              type="headline"
              bold
              style={{ flex: 1, marginTop: 4, marginLeft: 12 }}
            >{ name }</Typography>
            <Button onClick={handleRequestClose}>
              { action }
            </Button>
          </Toolbar>
        </AppBar>
        <BodyWrapper>
          { body }
        </BodyWrapper>
      </Dialog>
    </div>
  )
}

FullScreenDialog.propTypes = {
  Trigger: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
}

export default FullScreenDialog