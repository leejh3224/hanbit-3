import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Header from './Header'
import Footer from './Footer'

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
        <Header />
        <Content>
          { props.children }
        </Content>
        <Footer />
      </Wrapper>
  )
}

Template.propTypes = {

}

export default Template