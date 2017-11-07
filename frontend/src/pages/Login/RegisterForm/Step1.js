import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TextField from 'material-ui/TextField'

import Typography from 'shared/Typography'

const Wrapper = styled.div`
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

const Step1 = ({
  touched,
  errors,
  handleBlur,
  handleChange,
  values,
}) => {
  const hasError = (field) => {
    return touched[field] && errors[field]
  }
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

Step1.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
}

export default Step1