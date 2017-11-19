import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'material-ui/Avatar'
import CloseIcon from 'material-ui-icons/Close'

import Wrapper from 'shared/Wrapper'
import Image from 'shared/Image'
import List, { ListItem } from 'shared/List'
import Typography from 'shared/Typography'
import { RoundButton } from 'shared/Button'

import { FadeIn } from 'lib/animation'
import { currency } from 'lib/format'

import QuantityControl from 'shared/QuantityControl'

const SelectedItemList = ({
  product,
  selected,
  addQuantity,
  reduceQuantity,
  removeItem,
  isOrdering,
}) => {
  const { image, low_price } = product
  return (
    <List 
      column="true"
      fullwidth
      style={{ maxHeight: !isOrdering && 250, overflowY: 'scroll' }}
    >
      {
        selected.map((item, i) => {
          const quantity = Object.values(item)[0]

          return (
            selected.length &&
            <FadeIn>
              <ListItem 
                disableGutters 
                divider
                background="grey"
                padding={0}
                paddingbottom={1}
              >
                <Wrapper
                  fullwidth 
                  height={120}
                  padding={2}
                  alignitems="center"
                >
                  <Avatar
                    style={{
                      width: 80,
                      height: 80,
                      marginRight: 16,
                    }}
                  >
                    <Image 
                      src={image[0]} 
                      lazy 
                      height={80} 
                    />
                  </Avatar>
                  <Wrapper
                    column="true"
                    flex={1}
                  >
                    <Typography
                      type="display2"
                      margintop={1}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      type="display3"
                    >
                      {Object.keys(item)[0]}
                    </Typography>
                    {
                      !isOrdering ? (
                        <QuantityControl
                          quantity={quantity}
                          addQuantity={addQuantity}
                          reduceQuantity={reduceQuantity}
                          index={i}
                          value={Object.keys(item)[0]}
                        /> 
                      ) : (
                        <Typography
                          type="display1"
                          color="primary"
                          margintop={1}
                        >
                          {`${currency(quantity * low_price)}(${quantity}개)`}
                        </Typography>
                      )
                    }
                  </Wrapper>
                  {
                    !isOrdering &&
                    <RoundButton
                      diameter={22}
                      background="grey"
                      marginleft={1}
                      flex={0}
                      onClick={() => removeItem(i)}
                    >
                      <CloseIcon
                        style={{ color: '#000', width: 18, height: 18 }}
                      />
                    </RoundButton>
                  }
                </Wrapper>
              </ListItem>
            </FadeIn>
          )
        })
      }
    </List>
  )
}

SelectedItemList.propTypes = {

}

export default SelectedItemList