import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import AppBar from 'shared/AppBar'

import Tabs, { Tab } from 'material-ui/Tabs'

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

const StyledTab = styled(Tab)`
  && {
    color: #000;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const TabBar = ({
  value,
  handleChange,
  children,
}) => {
  return (
    <Wrapper>
      <StyledAppBar
        position="static"
      >
        <Tabs
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          scrollable
          scrollButtons="on"
        >
          <StyledTab label="이 주의 특가" />
          <StyledTab label="가을 신상" />
          <StyledTab label="핫한 신상" href="#basic-tabs" />
          <StyledTab label="이 주의 특가" />
          <StyledTab label="이 주의 특가" />
          <StyledTab label="이 주의 특가" />
          <StyledTab label="이 주의 특가" />
          <StyledTab label="이 주의 특가" />
        </Tabs>
      </StyledAppBar>
      {children}
    </Wrapper>
  )
}

export default TabBar