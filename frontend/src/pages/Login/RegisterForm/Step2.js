import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import ErrorMessage from 'shared/ErrorMessage'

import TermsOfService from './TermsOfService'
import PrivacyPolicy from './PrivacyPolicy'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Step2 = ({
  touched,
  errors,
  handleChange,
  values,
}) => {
  const hasError = (field) => {
    return !!(touched[field] && errors[field])
  }
  return (
    <Wrapper>
      <TermsOfService />
      <PrivacyPolicy />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.agreed}
            name="agreed"
            onChange={handleChange}
            value="agreed"
          />
        }
        label="위의 서비스 이용약관 및 개인정보 수집·이용에 동의합니다."
      />
      {
        hasError('agreed') &&
        <ErrorMessage>{errors.agreed}</ErrorMessage>
      }
    </Wrapper>
  )
}

Step2.propTypes = {
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
}

export default Step2