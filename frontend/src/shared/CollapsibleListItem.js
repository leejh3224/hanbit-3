import React from 'react'
import PropTypes from 'prop-types'

import Collapse from 'material-ui/transitions/Collapse'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import { ListItemIcon } from 'material-ui/List'

import Typography from 'shared/Typography'
import Wrapper from 'shared/Wrapper'
import { ListItem } from 'shared/List'

import { visibilityEnhancer } from 'lib/enhancer'

const CollapsibleListItem = ({
  labels,
  isVisible,
  setVisibility,
  ...props,
}) => {
  const [parent, ...rest] = Object.keys(labels)

  return (
    <Wrapper
      column="true"
    >
      <ListItem
        onClick={
          isVisible ? () => setVisibility(false) : () => setVisibility(true)
        }
        divider
        {...props}
      >
        {
          labels[parent].withIcon && (
            <ListItemIcon>
              {labels[parent].icon}
            </ListItemIcon>
          )
        }
        <Typography
          type="display2"
          flex={1}
          margintop={labels[parent].withIcon && 0.5}
        >
          {parent}
        </Typography>
        {isVisible ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isVisible} transitionDuration="auto" unmountOnExit>
        {
          rest.map((label, i) => {
            const firstField = Object.keys(labels[label])[0]

            return (
              <ListItem key={i} style={{ background: '#fff', paddingLeft: 16 }}>
                <Typography
                  key={label}
                  type="display2"
                  marginright={2}
                >
                  {label}
                </Typography>
                <Typography
                  key={label+1}
                  type="display3"
                >
                  {labels[label][firstField]}
                </Typography>
              </ListItem>
            )
          })
        }
      </Collapse>
    </Wrapper>
  )
}

CollapsibleListItem.propTypes = {

}

export default visibilityEnhancer(
  // initial state
  false,
)(CollapsibleListItem)