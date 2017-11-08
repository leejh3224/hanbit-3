import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'

/* formik */
import { withFormik } from 'formik'
import yup from 'yup'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Typography from 'shared/Typography'

import SocialLoginButtonGroup from './SocialLoginButtonGroup'

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  
  return (
    <StyledForm
    
      /* use onSubmit validation when user logs in */
      onSubmit={(e) => {
        const isEmpty = !values.email || !values.password
        if (isEmpty) {
          alert('입력란이 비어있습니다!')
        }
        handleSubmit(e)
      }}
    >
      <Typography
        type="subheading"
        data-bold
      >로그인</Typography>
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
      <Button
        raised
        type="submit"
        color="primary"
        style={{ minWidth: 300, marginTop: 24 }}
        disabled={isSubmitting}
      >
        계속하기
      </Button>
      <SocialLoginButtonGroup />
    </StyledForm>
  )
}

LoginForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  validationSchema: () => {   

    /* loginview: no field validation */
    return yup.object()
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
        history.push('/', { isLoggedIn: true })
      } else {
        alert('로그인 실패')
      }
    }).catch((errors) => {
      setSubmitting(false)

      const { status } = errors.response
      if (status === 401) {
        alert('잘못된 비밀번호 / 이메일!')
      } else if (status === 403) {
        alert('csrf토큰이 일치하지 않습니다.')
      } else {
        alert('로그인 실패')
      }
    })
  }
})(LoginForm)