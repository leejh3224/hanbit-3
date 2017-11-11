import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'
import throttle from 'lodash/throttle'
import isEmpty from 'lodash/isEmpty'

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
import { CircularProgress } from 'material-ui/Progress'

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
  setErrors,
  user,
  ...props,
}) => {
  return (
    <StyledForm onSubmit={(e) => {
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
          onClick={() => {

            /* 소셜 로그인을 통해 들어온 유저는 1단계로 갈 수 없게 만듬 */
            if (user.social && step <= 2) {
              return
            }
            prevStep()
          }}
        >
          <KeyboardArrowLeft />
          이전으로
        </Button>
        <Button
          raised
          type="submit"
          color="primary"
          style={{ minWidth: 120, marginTop: 24, paddingLeft: isSubmitting ? 24 : 32 }}
          disabled={isSubmitting}
          onClick={(e) => {
            const { values, errors } = props
            const steps = {
              1: ['email', 'password'],
              2: ['agreed'],
              3: ['name', 'phone', 'postcode', 'address1', 'address2']
            }
            const errorsInStep = Object.keys(errors)
            .filter(field => steps[step].includes(field))

            // 만약 1~2단계라면 다음 단계로 넘어가고 그 이후에는 제출
            if (step < 3) {
              e.preventDefault()
              
              if (!isEmpty(errors)) {
                errorsInStep.map(field => setFieldTouched(field, true))

                if (!errorsInStep.length) {
                  nextStep()
                }
              }

              if (!values.email) {
                setFieldTouched('email', true)
                return
              }

              if (!values.password) {
                setFieldTouched('password', true)
                return
              }

              if (step === 2 && !values.agreed) {
                setFieldTouched('agreed', true)
                return
              }

              nextStep()
            }

            /* 만약 에러가 난 상태로 다음 단계로 넘어가려 하면 에러 표시 */
            if (errorsInStep.length && !isEmpty(errors)) {
              errorsInStep.map(field => setFieldTouched(field, true))
              return
            }
          }}
        >
          { 
            isSubmitting ? 
              <CircularProgress
                color="primary"
                size={20}
                thickness={7.2}
              /> : '계속하기'
          }
          { !isSubmitting && <KeyboardArrowRight />}
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
    min: '${min}자리 이상 입력해주세요.',
    max: '최대 ${max}자까지 입력가능합니다.'
  },
})
/* eslint-enable no-template-curly-in-string */

const enhance = compose(

  /* 소셜 유저는 2단계부터 가입 시작 */
  withState('step', 'setStep', ({ user }) => user.social ? 2 : 1),
  withHandlers({
    nextStep: ({ setStep, step }) => 
      () => step < 3 && setStep(step + 1),
    prevStep: ({ setStep, step}) =>
      () => setStep(step - 1),
  }),
)

const checkDuplicate = throttle(value => {
  if (!value) {
    return false
  }
  return axios.get(`/users/email/${value}`, {
    timeout: 5000,
  }).then((response) => {
    const { data: { available } } = response

    return available
  }).catch((errors) => {
    alert(`${errors}`)
  })
}, 500)

const noDuplicateEmail = {
  message: '중복된 이메일입니다.',
  test: checkDuplicate,
}

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
  validationSchema: ({ user }) => {  
    return yup.object().shape({

      /* 소셜 유저는 이메일/패스워드를 검증하지 않음 */
      email: !user.social ? yup.string().required()
      .max(40).test(noDuplicateEmail).email() : yup.string(),
      password: !user.social ? yup.string().matches(/^[a-zA-Z0-9\s`~!@#$%^&*()-_+={}<>,.'"|]+$/g, '영문, 숫자, 공백, 특수문자만사용가능합니다.')
      .required().min(8).max(64) : yup.string(),
      agreed: yup.boolean().oneOf([true]),
      name: yup.string().matches(/^[가-힇]+$/g, '공백, 영문, 자모음 형태는 허용되지 않습니다.')
      .required().max(24),
      phone: yup.string().required().min(11, '11자리 모두 입력해주세요.'),
      postcode: yup.string().required(),
      address1: yup.string().required(),
      address2: yup.string().required().max(64),
    })
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    let { email, address2 } = values
    const { password, name, phone, postcode, address1 } = values
    const { social, userId } = props.user
    email = email.trim()
    address2 = address2.trim()

    /* 소셜 가입 */
    if (social) {
      alert('social user register!')

      axios.put(`/users/${userId}`, 
      {
        name,
        phone,
        postcode,
        address1,
        address2,
      },
      { 
        timeout: 20000,
      }).then((response) => {
        setSubmitting(false)
        const success = response.status === 200
        const { history } = props

        if (success) {
          history.push('/welcome', { isLoggedIn: true, register_completed: true })
        } else {
          alert('가입 실패')
        }
      }).catch((errors) => {
        setSubmitting(false)

        alert(`${errors}`)
      })
    } else {
      alert(`email: ${email},
      password: ${password},
      name: ${name}, phone: ${phone},
      postcode: ${postcode}, address1: ${address1},
      address2: ${address2}`)
      axios.post('/users/signup',
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
        timeout: 20000,
      }).then((response) => {
        setSubmitting(false)
        const success = response.status === 200
        const { history } = props

        if (success) {
          history.push('/welcome', { isLoggedIn: true, register_completed: true  })
        } else {
          alert('가입 실패')
        }
      }).catch((errors) => {
        setSubmitting(false)
            
        alert(`${errors}`)
      })
    }
  }
})(RegisterForm))