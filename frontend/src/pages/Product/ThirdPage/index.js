import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import List, { ListItem } from 'material-ui/List'
import WbCloudyIcon from 'material-ui-icons/WbCloudy'

import RelatedProduct from './RelatedProduct'

const FullList = styled(List)`
  &&{
    width: 100%;
    padding-top: 0;
  }
`

const StyledListItem = styled(ListItem)`
  && {
    display: flex;
    background-color: #fff;
  }
`

const ThirdPage = ({
  related,
}) => {
  return (
    <FullList>
      <StyledListItem style={{ marginBottom: 8, display: 'flex', justifyContent: 'center', paddingTop: 15 }}>
        이 상품은 어떤가요?
      </StyledListItem>
      {
        related.length ? (
          related.map(item => (
            <RelatedProduct key={item.name} related={item} />
          ))
        ) : (
          <StyledListItem 
            style={{
              minHeight: 300,
              color: 'grey',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WbCloudyIcon style={{ width: 32, height: 32, marginBottom: 8 }}/>
            관련 상품이 존재하지 않습니다.
          </StyledListItem>
        )
      }
    </FullList>
  )
}

ThirdPage.propTypes = {

}

export default ThirdPage