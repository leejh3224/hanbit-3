import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withState } from 'recompose'

import Toolbar from 'material-ui/Toolbar'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Button from 'material-ui/Button'

import AppBar from 'shared/AppBar'
import { PrimaryButton, WhiteButton } from 'shared/Button'

const StickyFooter = styled(AppBar)`
  && {
    top: calc(100% - 3.3em);
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    background: ${({ theme }) => theme.color.grey};
  }
`

const ExpandButton = styled(Button)`
  && {
    min-height: 28px;
    position: absolute;
    left: calc(50% - 44px);
    top: -28px;
    border-bottom: 0;
    padding: 0;
    color: #fff;
    background-color: ${({ theme }) => theme.color.grey};
    transform: perspective(10px) rotateX(3deg);

    &:hover {
      background-color: ${({ theme }) => theme.color.grey};
    }
  }
`

const PageFooter = () => {
  return (
    <StickyFooter>
      <ExpandButton>
        <ExpandLess />
      </ExpandButton>
      <Toolbar disableGutters>
        <WhiteButton
          style={{ marginRight: 8 }}
          flex="true"
        >
          장바구니
        </WhiteButton>
        <PrimaryButton flex="true">
          구매하기
        </PrimaryButton>
      </Toolbar>
    </StickyFooter>
  )
}

PageFooter.propTypes = {

}

export default PageFooter