import React from 'react'
import PropTypes from 'prop-types'

import List, { ListItem } from 'shared/List'
import Typography from 'shared/Typography'
import WbCloudyIcon from 'material-ui-icons/WbCloudy'

import RelatedProduct from './RelatedProduct'

const ThirdPage = ({
  related,
}) => {
  return (
    <List column="true">
      <ListItem 
        marginbottom={1}
        padding={2}
        justifycontent="center"
      >
        <Typography
          type="display2"
          margintop={0.5}
        >
          이 상품은 어떤가요?
        </Typography>
      </ListItem>
      {
        related.length ? (
          related.map(item => (
            <RelatedProduct 
              key={item.name} 
              related={item} 
            />
          ))
        ) : (
          <ListItem
            height={300}
            color="grey"
            column="true"
            alignitems="center"
            justifycontent="center"
          >
            <WbCloudyIcon style={{ width: 32, height: 32, marginBottom: 8 }}/>
            관련 상품이 존재하지 않습니다.
          </ListItem>
        )
      }
    </List>
  )
}

ThirdPage.propTypes = {

}

export default ThirdPage