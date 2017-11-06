import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { withFormik } from 'formik'
import yup from 'yup'
import { setLocale } from 'yup/lib/customLocale'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import Typography from 'shared/Typography'

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Icon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-size: cover;
  background-image: ${({ icon }) => `url(${require(`static/${icon}.png`)})`};
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Error = styled(Typography).attrs({
  type: 'display3',
})`
  color: ${({ theme }) => theme.color.error} !important;
`

/* 
 * for reusability, login form and 
 * register form(1st step) shares same component.
 * we use 'mode' prop to differenciate each of them
 */
const LoginForm = ({
  mode,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  const isLoginView = mode === 'signin'
  const hasError = (field) => {
    return !isLoginView &&
    touched[field] &&
    errors[field]
  }
  
  return (
    <StyledForm

      /* use onSubmit validation when user logs in */
      onSubmit={(e) => {
        if (isLoginView && !isEmpty(errors)) {
          alert(`${errors.email}, ${errors.password}`)
        }
        handleSubmit(e)
      }}
    >
      <Typography
        type="subheading"
        bold
      >{isLoginView ? '로그인' : '가입: 1 단계'}</Typography>
      <TextField
        label="이메일"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        style={{ minWidth: 300 }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      {
        hasError('email') &&
        <Error>{errors.email}</Error>
      }
      <TextField
        label="비밀번호"
        type="password"
        name="password"
        autoComplete="current-password"
        margin="normal"
        style={{ minWidth: 300 }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      />
      {
        hasError('password') &&
        <Error>{errors.password}</Error>
      }
      <Button
        raised
        type="submit"
        color="primary"
        style={{ minWidth: 300, marginTop: 24 }}
        disabled={isSubmitting}
      >
        계속하기
      </Button>
      {
        isLoginView && (
        <div>
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
        </div>
        )
      }
    </StyledForm>
  )
}

LoginForm.propTypes = {
  mode: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

/* eslint-disable no-template-curly-in-string */
/* locale error message */
setLocale({
  mixed: {
    required: '입력란이 비어있습니다.',
  },
  string: {
    email: '잘못된 이메일 주소입니다.',
    min: '최소 ${min}자리 이상 입력해주세요.',
  },
})
/* eslint-enable no-template-curly-in-string */

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  validationSchema: ({ mode }) => {   
    const isLoginView = mode === 'signin'
    if (isLoginView) {
      return yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required()
      })
    }
    return yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8)
    })
  },
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const { email, password } = values

    /* get csrf token from cookie */
    //const _csrf = document.cookie.split(';')[1].split('=')[1]

    alert(`email: ${email}\n password: ${password}`)
    axios.post('/user/signin', 
    { email, password, //csrf 
    },
    { 
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      timeout: 5000,
    }).then((response) => {
      setSubmitting(false)
      const success = response.status === 200
      const { history } = props

      if (success) {
        history.push('/')
      } else {
        alert('로그인 실패')
      }
    }).catch((errors) => {
      setSubmitting(false)
      setErrors(errors)
      alert(errors)
    })
  }
})(LoginForm)