import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  compose,
  withState,
  withHandlers,
} from 'recompose'

import Toolbar from 'material-ui/Toolbar'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import Input from 'material-ui/Input'

import AppBar from 'shared/AppBar'
import { PrimaryButton, WhiteButton } from 'shared/Button'
import List, { ListItem } from 'shared/List'
import Typography from 'shared/Typography'

import { visibilityEnhancer } from 'lib/enhancer'
import { FadeIn } from 'lib/animation'
import { currency } from 'lib/format'

import SelectedItemList from 'shared/SelectedItemList'

const ExpandButton = styled(WhiteButton)`
  && {
    transform: perspective(10px) rotateX(3deg);
  }
`

const StyledSelect = styled(Select)`
  && {
    width: 100%;
    h1 {
      line-height: 32px;
      margin-left: 8px;
    }
  }
`

const SelectControl = ({
  option,
  value,
  setValue,
  selectItem,
}) => {
  const { selects } = option
  const handleSelect = e => {
    selectItem(e.target.value)
    setValue(e.target.value)
  }
  return (
    <ListItem 
      disableGutters 
      divider
      background="grey"
    >
      <StyledSelect
        value={value}
        onChange={handleSelect}
        input={<Input type="text" />}
      >
        {
          selects.map(name => 
            <MenuItem 
              dense 
              value={name} 
              key={name}
            >
              <Typography type="display3">
                {name}
              </Typography>
            </MenuItem>
          )
        }
      </StyledSelect>
    </ListItem>
  )
}

const Footer = ({
  history,
  options,
  product,
  cart,
  addToCart,
  isVisible,
  setVisibility,
  value,
  setValue,
  selected,
  setSelected,
  selectItem,
  removeItem,
  quantity,
  addQuantity,
  reduceQuantity,
}) => {
  const { 
    _id, 
    low_price 
  } = product
  const sum = selected.map(
    item => Object.values(item)[0]
  ).reduce((a, b) => a + b, 0) * low_price
  const handleExtend = () => {

    // 창을 닫거나 다른 물건으로 이동시 초기화
    setSelected([])
    isVisible ? (
      setVisibility(false)
    ) : (
      setVisibility(true)
    )
  }
  const handlePurchase = () => {
    if (!selected.length) {
      setVisibility(true)
    } else {
      addToCart(_id, selected)

      // 선택한 상품정보를 넘겨줌
      history.push('/order', { product, selected })
    }
  }
  
  return (
    <AppBar
      padding={1}
      background="grey"
      top="auto"
      bottom={0}
    >
      <ExpandButton
        position="absolute"
        left="calc(50% - 44px)"
        top={-4}
        background="grey"
        border="none"
        height={32}
        onClick={handleExtend}
      >
        { 
          isVisible ? <ExpandLess /> : <ExpandMore /> 
        }
      </ExpandButton>
      {
        isVisible && (
          <FadeIn>
            <List
              column="true"
            >
              <SelectControl 
                option={options[0]}
                value={value}
                setValue={setValue} 
                selectItem={selectItem}
              />
              <SelectedItemList 
                product={product} 
                selected={selected}
                removeItem={removeItem}
                addQuantity={addQuantity}
                reduceQuantity={reduceQuantity}
              />
              <ListItem
                disableGutters
                background="grey"
                justifycontent="flex-end"
              >
                <Typography
                  type="display2"
                  marginright={1}
                >총 결제금액:</Typography>
                <Typography
                  type="headline"
                  color="primary"
                >{currency(sum)}</Typography>
              </ListItem>
            </List>
          </FadeIn>
        )
      }
      <Toolbar disableGutters>
        <WhiteButton
          background="white"
          marginright={1}
        >
          장바구니
        </WhiteButton>
        <PrimaryButton
          onClick={handlePurchase}
        >
          구매하기
        </PrimaryButton>
      </Toolbar>
    </AppBar>
  )
}

Footer.propTypes = {
  options: PropTypes.array,
}


const ItemEnhancer = compose(
  withState('selected', 'setSelected', []),
  withHandlers({
    selectItem: ({ selected }) => 
      // 만약 같은 아이템이 있다면 추가 x
      (value) => !selected.filter(item => Object.keys(item)[0] === value).length && selected.push({ [value]: 1 }),
    removeItem: ({ selected, setSelected }) => 
      (i) => setSelected(selected.filter((item, index) => index !== i)),
    addQuantity: ({ selected, setSelected }) => 
      (i, value) => setSelected(
        selected.map((item, index) => index === i ? { [value]: item[value] += 1 } : item)
      ),
    reduceQuantity: ({ selected, setSelected }) => 
      (i, value) => setSelected(
        selected.map((item, index) => index === i && item[value] > 1 ? { [value]: item[value] -= 1 } : item)
      ),
  }),
)

export default visibilityEnhancer(
  // select
  ({ options }) => options[0].selects[0],
  true,
)(ItemEnhancer(
visibilityEnhancer(
  false,
)(Footer)))