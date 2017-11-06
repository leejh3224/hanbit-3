import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'material-ui/Button'

const Wrapper = styled.div``

const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
`

const Icon = styled.div`
width: 56px;
height: 56px;
border-radius: 50%;
background-size: cover;
background-image: ${({ icon }) => `url(${require(`static/${icon}.png`)})`};
`

const SocialLoginButtonGroup = () => {
  return (
    <Wrapper>
      <p style={{ textAlign: 'center' }}>또는</p>
      <ButtonWrapper>
        <a href="http://127.0.0.1:8080/user/signup/facebook">
          <Button fab style={{ marginRight: 16 }}>
            <Icon icon="facebook" />
          </Button>
        </a>
        <a href="http://127.0.0.1:8080/user/signup/naver">
          <Button fab>
            <Icon icon="naver" />
          </Button>
        </a>
      </ButtonWrapper>
    </Wrapper>
  )
}

SocialLoginButtonGroup.propTypes = {

}

export default SocialLoginButtonGroup