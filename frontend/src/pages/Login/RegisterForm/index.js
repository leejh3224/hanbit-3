import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'

/* formik */
import { withFormik } from 'formik'
import yup from 'yup'
import { setLocale } from 'yup/lib/customLocale'
import { compose, withState, withHandlers } from 'recompose'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

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

const ButtonWrapper = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`

const stepNames = ['회원정보 입력', '약관 동의', '개인정보 입력']

const RegisterForm = ({
  step,
  prevStep,
  nextStep,
  isSubmitting,
  handleSubmit,
  setFieldTouched,
  ...props,
}) => {
  return (
    <StyledForm onSubmit={(e) => {
      alert('submitting..')
      handleSubmit(e)
    }}>
      <Typography
        type="display2"
      >
        {`전체 3단계 (현재: ${step}단계 )`}
      </Typography>
      <Typography
        type="subheading"
        data-bold
      >{`${step} 단계: ${stepNames[step - 1]}`}</Typography>
      {
        { 
          1: <Step1 {...props} />,
          2: <Step2 {...props} />,
          3: <Step3 {...props} />,
        }[step]
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
            const { values } = props

            // 만약 1~2단계라면 다음 단계로 넘어가고 그 이후에는 제출
            if (step < 3) {
              e.preventDefault()
              if (step === 1) {
                if(!values.email) {
                  setFieldTouched('email', true)
                  return
                }
                if (!values.password) {
                  setFieldTouched('password', true)
                  return
                }
              } 
              if (step === 2 && !values.agreed) {
                setFieldTouched('agreed', true)
                return
              }
              nextStep()
            }
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
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
}

/* eslint-disable no-template-curly-in-string */
/* locale error message */
setLocale({
  mixed: {
    required: '필수입력 항목입니다.',
    oneOf: '가입을 계속 진행하시려면 약관에 동의해야 합니다.',
  },
  string: {
    email: '잘못된 이메일 주소입니다.',
    min: '공백 제외 ${min}자리 이상 입력해주세요.',
    max: '최대 ${max}자까지 입력가능합니다.'
  },
})
/* eslint-enable no-template-curly-in-string */

const enhance = compose(
  withState('step', 'setStep', 1),
  withHandlers({
    nextStep: ({ setStep, step }) => 
      () => step < 3 && setStep(step + 1),
    prevStep: ({ setStep, step}) =>
      () => setStep(step - 1),
  }),
)

export default enhance(withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
    agreed: false,
    name: '',
    phone: '',
    postcode: '',
    address1: '',
    address2: '',
  }),
  validationSchema: () => {   
    return yup.object().shape({
      email: yup.string().required().email().max(40),
      password: yup.string().matches(/^[a-zA-Z0-9]+$/g, '영문과 숫자만 사용가능합니다.')
      .required().min(8).max(24),
      agreed: yup.boolean().oneOf([true]),
      name: yup.string().matches(/^[가-힇]+$/g, '공백, 영문, 자모음 형태는 허용되지 않습니다.')
      .required().max(24),
      phone: yup.string().required(),
      postcode: yup.string().required(),
      address1: yup.string().required(),
      address2: yup.string().required().max(64),
    })
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    let { email, address2, phone } = values
    const { password, name, postcode, address1 } = values
    email = email.trim()
    address2 = address2.trim()
    phone = phone.slice(6)

    alert(`email: ${email},
    password: ${password},
    name: ${name}, phone: ${phone},
    postcode: ${postcode}, address1: ${address1},
    address2: ${address2}`)
    axios.post('/user/signup',
    { 
      email,
      password,
      name,
      phone,
      postcode,
      address1,
      address2,
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
        alert('가입 실패')
      }
    }).catch((errors) => {
      setSubmitting(false)
      console.log(errors)
          
      alert(`${errors}`)
    })
  }
})(RegisterForm))