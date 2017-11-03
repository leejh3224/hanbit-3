import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import Template from '../Template'
import Image from 'shared/Image'
import Typography from 'shared/Typography'

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;

  padding: ${({ theme }) => theme.spacing * 2}px;

  .card-image {
    flex: 1;
  }

  @media(max-width: 40em) {
    .card-image {
      flex: 0;
    }
  }
`

const SocialButton = styled(Button).attrs({
  fab: true,
})`
  background-size: cover;
  background-image: ${({ icon }) => `url(${require(`static/${icon}.png`)})`};
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Login = () => {
  return (
    <Template>
      <Wrapper>
        <Card
          style={{
            display: 'flex',
            margin: '56px auto 16px auto',
            maxWidth: 1000,
          }}
        >
          <div className="card-image">
            <Image 
              src={require('static/mac.jpg')}
              height={500}
            />
          </div>
          <CardContent style={{ flex: 2 }}>
            <form style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography
                type="subheading"
                bold
              >로그인</Typography>
              <TextField
                label="이메일"
                type="email"
                autoComplete="email"
                margin="normal"
                style={{ minWidth: 300 }}
              />
              <TextField
                label="비밀번호"
                type="password"
                autoComplete="current-password"
                margin="normal"
                style={{ minWidth: 300, marginBottom: 24 }}
              />
              <Button
                raised
                color="primary"
                style={{ minWidth: 300 }}
              >
                계속하기
              </Button>
              <p>또는</p>
              <ButtonWrapper>
                <SocialButton
                  style={{ marginRight: 16 }}
                  icon="facebook"
                />
                <SocialButton
                  icon="naver"
                />
              </ButtonWrapper>
            </form>
          </CardContent>
        </Card>
        <NavWrapper>
          <Link to="/">
            <Button>처음이신가요?</Button>
          </Link>
          <Link to="/">
            <Button>비밀번호를 잊어버리셨나요?</Button>
          </Link>
        </NavWrapper>
      </Wrapper>
    </Template>
  )
}

Login.propTypes = {

}

export default Login