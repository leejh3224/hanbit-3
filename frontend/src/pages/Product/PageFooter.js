import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Toolbar from 'material-ui/Toolbar'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import CloseIcon from 'material-ui-icons/Close'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import AppBar from 'shared/AppBar'
import { PrimaryButton, WhiteButton } from 'shared/Button'
import Typography from 'shared/Typography'
import { RoundButton } from 'shared/Button'

import { visibilityEnhancer } from 'lib/enhancer'
import { FadeIn } from 'lib/animation'

const StickyFooter = styled(AppBar)`
  && {
    top: calc(100% - 15em);
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

const FullList = styled(List)`
  &&{
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
  }
`

const StyledListItem = styled(ListItem)`
  && {
    display: flex;
    background-color: ${({ theme }) => theme.color.grey};
  }
`

const PageFooter = ({
  options,
  isVisible,
  setVisibility,
}) => {
  const { name, selects } = options[0]
  const selected = []
  return (
    <StickyFooter>
      <ExpandButton 
        onClick={
          () => isVisible ? 
            setVisibility(false) : setVisibility(true)
        }
      >
        { 
          isVisible ? (
            <ExpandMore /> 
          ) : (
            <ExpandLess /> 
          )
        }
      </ExpandButton>
      {
        isVisible && (
          <FadeIn>
            <FullList>
              <StyledListItem disableGutters divider>
                <select style={{ width: '100%', height: 32 }}>
                  {name}
                  {selects.map(name => <option style={{ width: '100%' }} key={name}>{name}</option>)}
                </select>
              </StyledListItem>
              <StyledListItem disableGutters divider>
                <div style={{ backgroundColor: '#fff', borderRadius: 5, width: '100%', padding: 8, display: 'flex', alignItems: 'center' }}>
                  <Avatar style={{ backgroundColor: '#c5001a', marginRight: 8 }}>
                    R
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <ListItemText primary="lorem" />
                    <input type="number" /> 
                  </div>
                  <RoundButton
                    diameter={24}
                    color="grey"
                  >
                    <CloseIcon style={{ color: '#fff', width: 18, height: 18 }} />
                  </RoundButton>
                </div>
              </StyledListItem>
              <StyledListItem disableGutters style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography
                  type="display2"
                  style={{ color: '#000' }}
                >총 결제금액:</Typography>
                <Typography
                  type="headline"
                  style={{ color: 'red' }}
                >{" 17,000원"}</Typography>
              </StyledListItem>
            </FullList>
          </FadeIn>
        )
      }
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
  options: PropTypes.array,
}

export default visibilityEnhancer(
  false,
)(PageFooter)