import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  NavLink,
  withRouter,
} from 'react-router-dom'

import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'

import Template from '../Template'
import Image from 'shared/Image'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const StyledCard = styled(Card)`
  display: flex;
  margin: 56px auto 16px auto;
  max-width: 1000px;
  min-height: 600px;

  @media(max-width: 40em) {
    min-height: 400px;
  }
`

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;

  // 카드와 헤더 사이의 간격
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

const StyledCardContent = styled(CardContent)`
  flex: 2;
  padding: 32px;

  @media(max-width: 40em) {
    padding: 8px;
  }
`

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Login = ({
  match,
  history,
}) => {

  /*
   * login or register 
   * @array: ['login' or 'login']
   * */
  const mode = match.params[0]
  const isLoginView = mode === 'signin'
  const reverse = (mode) => {
    if(isLoginView) {
      return 'signup'
    }
    return 'signin'
  }
  return (
    <Template>
      <Wrapper>
        <StyledCard>
          <div className="card-image">
            <Image 
              src={require('static/gg.jpg')}
              height={'100%'}
            />
          </div>
          <StyledCardContent>
            {
              isLoginView ? (
                <LoginForm
                  history={history}
                />
              ) : (
                <RegisterForm />
              )
            }
          </StyledCardContent>
        </StyledCard>
        <NavWrapper>
          <NavLink
            to={`/${reverse(mode)}`}
            activeStyle={{ color: '#000' }}
          >
            <Button>
            {
              isLoginView ? 
              '처음이신가요?' : '로그인하기'
            }
            </Button>
          </NavLink>
          {
            isLoginView && (
            <NavLink to="/" activeStyle={{ color: '#000' }}>
              <Button>비밀번호를 잊어버리셨나요?</Button>
            </NavLink>
            )
          }
        </NavWrapper>
      </Wrapper>
    </Template>
  )
}

Login.propTypes = {

}

export default withRouter(Login)