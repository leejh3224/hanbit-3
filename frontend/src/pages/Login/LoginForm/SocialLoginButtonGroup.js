import React from 'react'
import styled from 'styled-components'

import Button from 'material-ui/Button'

import config from 'config'

const { static_url } = config

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
background-image: ${({ icon }) => `url(${`${static_url}/etc/${icon}.png`})`};
`

const SocialLoginButtonGroup = () => {
  return (
    <Wrapper>
      <p style={{ textAlign: 'center' }}>또는</p>
      <ButtonWrapper>
        <a href="http://127.0.0.1:8080/users/signup/facebook">
          <Button fab style={{ marginRight: 16 }}>
            <Icon icon="facebook" />
          </Button>
        </a>
        <a href="http://127.0.0.1:8080/users/signup/naver">
          <Button fab>
            <Icon icon="naver" />
          </Button>
        </a>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default SocialLoginButtonGroup