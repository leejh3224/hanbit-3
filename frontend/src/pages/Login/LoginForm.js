import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
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
  const hasError = (field) => {
    return mode !== 'login' &&
    touched[field] &&
    errors[field]
  }
  
  return (
    <StyledForm

      /* use onSubmit validation when user logs in */
      onSubmit={(e) => {
        if (mode === 'login' && !isEmpty(errors)) {
          alert(`${errors.email}, ${errors.password}`)
        }
        handleSubmit(e)
      }}
    >
      <Typography
        type="subheading"
        bold
      >{mode === 'login' ? '로그인' : '가입: 1 단계'}</Typography>
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
        mode === 'login' && (
        <div>
          <p style={{ textAlign: 'center' }}>또는</p>
          <ButtonWrapper>
            <SocialButton
              style={{ marginRight: 16 }}
              icon="facebook"
            />
            <SocialButton
              icon="naver"
            />
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
  string: {
    email: '잘못된 이메일 주소입니다.',
    min: '최소 ${min}자리 이상 입력해주세요.',
  },
})
/* eslint-enable no-template-curly-in-string */

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  validationSchema: ({ mode }) => {
    if (mode === 'login') {
      return yup.object().shape({
        email: yup.string().required('이메일을 입력해주세요.'),
        password: yup.string().required('비밀번호를 입력해주세요.')
      })
    }
    return yup.object().shape({
      email: yup.string().required('이메일을 입력해주세요.').email(),
      password: yup.string().required('비밀번호를 입력해주세요.').min(8)
    })
  },
  handleSubmit: (values, { setSubmitting, setErros }) => {
    alert(`email: ${values.email}\n password: ${values.password}`)
    setSubmitting(false)
      // .then(user => {
      //   setSubmitting(false)
      // })
      // .catch(errors => {
      //   setSubmitting(false)
      //   setErros(errors)
      // })
  }
})(LoginForm)