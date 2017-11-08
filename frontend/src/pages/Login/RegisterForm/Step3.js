import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TextField from 'material-ui/TextField'
import ErrorMessage from 'shared/ErrorMessage'
import NumberFormat from 'react-number-format'
import Button from 'material-ui/Button'

import postCodeOptions from 'lib/postCodeOptions'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Step3 = ({
  touched,
  errors,
  handleBlur,
  handleChange,
  values,
  setFieldValue,
}) => {
  const hasError = (field) => {
    return !!(touched[field] && errors[field])
  }

  // global daum object
  const daum = window.daum
  return (
    <Wrapper>
      <TextField
        error={hasError('name')}
        required
        label="이름(실명)"
        type="text"
        helperText="배송확인 용도로만 사용됩니다."
        name="name"
        autoComplete="name"
        margin="normal"
        style={{ minWidth: 300 }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      {
        hasError('name') &&
        <ErrorMessage>{errors.name}</ErrorMessage>
      }
      <NumberFormat
        error={hasError('phone')}
        required
        label="전화번호(휴대전화)"
        type="text"
        name="phone"
        helperText="배송확인 용도로만 사용됩니다."
        autoComplete="phone"
        margin="normal"
        style={{ minWidth: 300 }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.phone}
        customInput={TextField}
        placeholder="(010) XXXX-XXXX"
        format="(010) ####-####"
        mask="__"
      />
      {
        hasError('phone') &&
        <ErrorMessage>{errors.phone}</ErrorMessage>
      }
      <div style={{ display: 'flex', maxWidth: 300, margin: '16px 0 8px 0', height: 48 }}>
        <TextField 
          error={hasError('postcode')}
          placeholder="우편번호*"
          inputProps={{ readOnly: true, id: "postcode" }}
          style={{ marginRight: 24, alignSelf: 'flex-end' }}
          value={values.postcode}
        />
        <Button
          raised
          color="primary"
          onClick={() => {

            /* 
            * postCodeOptions는 
            * field 3개의 id 값을 파라미터로 받음
            * @func setFieldValue: (field: string, value: any) => void
            */
            new daum.Postcode(
              postCodeOptions('postcode', 'address1', 'address2', setFieldValue)
            ).open()
          }}
          style={{ width: 120, alignSelf: 'flex-end' }}
        >
          검색하기
        </Button>
      </div>
      {
        hasError('postcode') &&
        <ErrorMessage>{errors.postcode}</ErrorMessage>
      }
      <TextField
        error={hasError('address1')}
        placeholder="주소*"
        type="text"
        name="address1"
        margin="normal"
        style={{ minWidth: 300, height: 48, paddingTop: 16, boxSizing: 'border-box' }}
        value={values.address1}
        inputProps={{ readOnly: true, id: "address1" }}
      />
      {
        hasError('address1') &&
        <ErrorMessage>{errors.address1}</ErrorMessage>
      }
      <TextField
        error={hasError('address2')}
        required
        label="상세주소"
        type="text"
        helperText="원활한 배송을 위해 정확하게 기입해주세요."
        name="address2"
        margin="normal"
        style={{ minWidth: 300 }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.address2}
        inputProps={{ id: "address2" }}
      />
      {
        hasError('address2') &&
        <ErrorMessage>{errors.address2}</ErrorMessage>
      }
    </Wrapper>
  )
}

Step3.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
}

export default Step3