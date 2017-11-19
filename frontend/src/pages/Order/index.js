import React from 'react'
import PropTypes from 'prop-types'

import Input from 'material-ui/Input'

import Wrapper from 'shared/Wrapper'
import List, { ListItem } from 'shared/List'
import Typography from 'shared/Typography'
import SelectedItemList from 'shared/SelectedItemList'
import CollapsibleListItem from 'shared/CollapsibleListItem'

import Template from '../Template'
import PayMethod from './PayMethod'

import { currency } from 'lib/format'

const Order = ({
  location,
  user,
}) => {
  const { state: { product, selected } } = location
  const { low_price } = product
  const { 
    address, 
    name, 
    phone, 
  } = user
  const sum = selected.map(
    item => Object.values(item)[0]
  ).reduce((a, b) => a + b, 0) * low_price

  return (
    <Template>
      <Wrapper paddingtop={8}>
        <List column="true">
          <ListItem marginbottom={1}>
            <Typography
              type="display2"
            >
              주문 내역
            </Typography>
          </ListItem>
          <SelectedItemList 
            product={product} 
            selected={selected}
            isOrdering
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
          <CollapsibleListItem 
            labels={{
              "배송 정보 확인하기": {
                withIcon: false,
              },
              "주소": {
                input: <Input 
                          type="text" 
                          multiline 
                          defaultValue={address} 
                          style={{
                            width: 230,
                          }}
                        />,
                name: '주소',
              },
              "이름": {
                input: <Input type="text" defaultValue={name} style={{ width: 80 }} />,
                name: '이름',
              },
              "연락처": {
                input: <Input type="text" defaultValue={phone} />,
                name: '연락처',
              },
            }}
            margintop={1}
          />
          <ListItem 
            margintop={1}
            marginbottom={1}
          >
            <Typography
              type="display2"
            >
              결제 방식
            </Typography>
          </ListItem>
          <PayMethod 
            product={product}
          />
        </List>
      </Wrapper>
    </Template>
  )
}

Order.propTypes = {

}

export default Order