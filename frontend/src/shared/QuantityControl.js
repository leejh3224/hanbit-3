import React from 'react'
import PropTypes from 'prop-types'

import AddIcon from 'material-ui-icons/Add'
import RemoveIcon from 'material-ui-icons/Remove'

import Wrapper from 'shared/Wrapper'

const QuantityControl = ({
  quantity,
  addQuantity,
  reduceQuantity,
  index,
  value,
}) => {
  return (
    <Wrapper
      alignself="flex-end"
      alignitems="center"
      width={80}
    >
      <RemoveIcon
        onClick={() => reduceQuantity(index, value)} 
        style={{ color: '#000' }} 
      />
      <input 
        type="number"
        readOnly
        value={quantity}
        style={{
          maxWidth: 30,
          textAlign: 'center',
        }}
      />
      <AddIcon
        onClick={() => addQuantity(index, value)} 
        style={{ color: '#000' }} 
      />
    </Wrapper>
  )
}

QuantityControl.propTypes = {

}

export default QuantityControl