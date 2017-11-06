import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.background};
`

const Content = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Template = (props) => {
  return (
      <Wrapper>
        <Content>
          { props.children }
        </Content>
      </Wrapper>
  )
}

Template.propTypes = {

}

export default Template