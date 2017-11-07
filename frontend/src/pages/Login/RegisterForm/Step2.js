import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

import Typography from 'shared/Typography'

import TermsOfService from './TermsOfService'
import PrivacyPolicy from './PrivacyPolicy'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Step2 = () => {
  return (
    <Wrapper>
      <TermsOfService />
      <PrivacyPolicy />
      <FormControlLabel
        control={
          <Checkbox
            checked={true}
            onChange={() => true}
            value="x"
          />
        }
        label="위의 서비스 이용약관 및 개인정보 수집·이용에 동의합니다."
      />
    </Wrapper>
  )
}

Step2.propTypes = {

}

export default Step2