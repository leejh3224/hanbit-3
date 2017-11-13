import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withState } from 'recompose'

import AppBar from 'shared/AppBar'

import Tabs, { Tab } from 'material-ui/Tabs'
import Badge from 'material-ui/Badge'

const StyledAppBar = styled(AppBar)`
  && {
    min-height: 48px;
    margin: 0 8px 8px 8px;
    width: calc(100% - 16px);
    z-index: 2;

    // no shadow
    box-shadow: none;

    @media(max-width: 40em) {
      width: 100%;
      margin: 0 0 8px 0;
    }

    // selected underline
    .MuiTabIndicator-root-132 {
      height: 3px;
    }

    // scroll button
    .MuiTabScrollButton-root-116 {
      color: #000;
    }
  }
`

const StyledBadge = styled(Badge)`
  && {
    span {
      width: 24px;
      height: 24px;
      right: -28px;
      top: -5px;
    }
  }
`

const StyledTab = styled(Tab)`
  && {
    color: #000;
    min-width: 120px;
    flex: 1;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const enhance = compose(
  withState('index', 'setIndex', 0),
)

const TabBar = enhance(({
  index,
  setIndex,
  names,
  children,
}) => {
  const namesArray = Object.keys(names)

  return (
    <div style={{ width: '100%' }}>
      <Wrapper>
        <StyledAppBar
          position="static"
        >
          <Tabs
            indicatorColor="primary"
            value={index}
            onChange={(e, value) => setIndex(value)}
            centered
            scrollable
            scrollButtons="off"
          >
            {
              namesArray.map(name => {
                const { withBadge, count } = names[name]
                return (
                  /* 배지가 있으면 icon 없으면 label */
                  withBadge ? (
                    <StyledTab
                      key={name}
                      icon={
                        withBadge && (
                        <StyledBadge
                          color="primary"
                          badgeContent={count}
                        >
                          {name}
                        </StyledBadge>
                        )
                      } 
                    />
                  ) : ( 
                    <StyledTab key={name} label={name} />
                  )
                )
              })
            } 
          </Tabs>
        </StyledAppBar>
      </Wrapper>
      {
        Array.isArray(children) ? 
        children[index] : children
      }
    </div>
  )
})

TabBar.propTypes = {
  index: PropTypes.number,
  setIndex: PropTypes.func,
  names: PropTypes.object.isRequired,
  children: PropTypes.any,
}

export default TabBar