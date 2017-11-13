import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withState } from 'recompose'

import { ListItem, ListItemIcon } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

import Typography from 'shared/Typography'

const Wrapper = styled.div``

const enhance = compose(
  withState('open', 'setItemVisibility', false),
)

const CollapsibleListItem = enhance(({
  labels,
  open,
  setItemVisibility,
}) => {
  const [parent, ...rest] = Object.keys(labels)

  return (
    <Wrapper>
      <ListItem
        style={{ background: '#fff' }}
        onClick={
          open ? () => setItemVisibility(false) : () => setItemVisibility(true)
        }
        divider
      >
        {
          labels[parent].withIcon && (
            <ListItemIcon>
              {labels[parent].icon}
            </ListItemIcon>
          )
        }
        <Typography
          type="display1"
          style={{ color: '#000', flex: 1, marginTop: 4 }}
        >
          {parent}
        </Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} transitionDuration="auto" unmountOnExit>
        {
          rest.map((label, i) => (
            <ListItem key={i} style={{ background: '#fff', paddingLeft: 16 }}>
              <Typography
                key={label}
                type="display2"
                style={{ color: '#000', flex: 1 }}
              >
                {label}
              </Typography>
              <Typography
                key={label+1}
                type="display3"
              >
                {labels[label].available_until}
              </Typography>
            </ListItem>
          ))
        }
      </Collapse>
    </Wrapper>
  )
})

CollapsibleListItem.propTypes = {

}

export default CollapsibleListItem