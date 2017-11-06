import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'

/* formik */
import { withFormik } from 'formik'
import yup from 'yup'
import { setLocale } from 'yup/lib/customLocale'
import { compose, withState, withHandlers } from 'recompose'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'

import Typography from 'shared/Typography'

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Error = styled(Typography).attrs({
  type: 'display3',
})`
  color: ${({ theme }) => theme.color.error} !important;
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`

const RegisterForm = ({
  step,
  prevStep,
  nextStep,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isSubmitting
}) => {
  const hasError = (field) => {
    return touched[field] && errors[field]
  }
  return (
    <StyledForm>
      <Typography
        type="display2"
      >
        {`전체 3단계 (현재: ${step}단계 )`}
      </Typography>
      <Typography
        type="subheading"
        bold
      >{`${step} 단계: 회원정보 입력`}</Typography>
      <TextField
        error={hasError('email')}
        required
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
        error={hasError('password')}
        required
        label="비밀번호"
        type="password"
        name="password"
        autoComplete="current-password"
        margin="normal"
        style={{ minWidth: 300 }}
        helperText={'보안을 위해 최소 8자리 이상 입력해주세요.'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      />
      {
        hasError('password') &&
        <Error>{errors.password}</Error>
      }
      <ButtonWrapper>
        <Button
          raised
          type="button"
          color="primary"
          style={{ minWidth: 120, marginTop: 24, paddingRight: 32 }}
          disabled={step <= 1}
          onClick={prevStep}
        >
          <KeyboardArrowLeft />
          이전으로
        </Button>
        <Button
          raised
          type="submit"
          color="primary"
          style={{ minWidth: 120, marginTop: 24, paddingLeft: 32 }}
          disabled={isSubmitting}
          onClick={(e) => {
            e.preventDefault()
            nextStep()
          }}
        >
          계속하기
          <KeyboardArrowRight />
        </Button>
      </ButtonWrapper>
    </StyledForm>
  )
}

RegisterForm.propTypes = {

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

const enhance = compose(
  withState('step', 'setStep', 1),
  withHandlers({
    nextStep: ({ setStep, step }) => 
      () => setStep(step + 1),
    prevStep: ({ setStep, step}) =>
      () => setStep(step - 1),
  }),
)

export default enhance(withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  validationSchema: () => {   
    return yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8)
    })
  },
  handleSubmit: (values, { props, setSubmitting }) => {
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
})(RegisterForm))