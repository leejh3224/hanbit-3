import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.background};
`

const Content = styled.main`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
`

const Template = (props) => {
  return (
      <Wrapper>
        <Content>
          {props.children}
        </Content>
      </Wrapper>
  )
}

export default Template