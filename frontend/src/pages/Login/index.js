import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'

import Template from '../Template'
import Image from 'shared/Image'
import Link from 'shared/Link'

/* forms */
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import config from 'config'

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
    padding: 0;
    .card-image {
      flex: 0;
    }
  }
`

const StyledCardContent = styled(CardContent)`
  flex: 2;
  padding: 32px;
  overflow: hidden;

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
  user,
}) => {

  /*
   * login or register 
   * @array: ['login' or 'login']
   * */
  const { static_url } = config
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
              src={`${static_url}/etc/gg.jpg`}
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
                <RegisterForm
                  user={user}
                  history={history}
                />
              )
            }
          </StyledCardContent>
        </StyledCard>
        <NavWrapper>
          <Link to={`/${reverse(mode)}`}>
            <Button>
            {
              isLoginView ? 
              '가입하기' : '로그인하기'
            }
            </Button>
          </Link>
          {
            isLoginView && (
            <Link to="/">
              <Button>비밀번호를 잊어버리셨나요?</Button>
            </Link>
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