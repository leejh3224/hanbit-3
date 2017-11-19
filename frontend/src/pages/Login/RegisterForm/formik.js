import yup from 'yup'
import axios from 'axios'
import throttle from 'lodash/throttle'
import { setLocale } from 'yup/lib/customLocale'
import isEmpty from 'lodash/isEmpty'

export const fields = () => ({
  email: '',
  password: '',
  agreed: false,
  name: '',
  phone: '',
  postcode: '',
  address1: '',
  address2: '',
})

export const pageNames = ['회원정보 입력', '약관 동의', '개인정보 입력']

export const handleNextButton = (e, props) => {
  const { 
    values, 
    errors, 
    setFieldTouched, 
    page,
    nextPage 
  } = props
  const requiredField = {
    1: ['email', 'password'],
    2: ['agreed'],
    3: ['name', 'phone', 'postcode', 'address1', 'address2']
  }
  const errorsInStep = Object.keys(errors)
  .filter(field => requiredField[page].includes(field))

  // 만약 1~2단계라면 다음 단계로 넘어가고 그 이후에는 제출
  if (page < 3) {
    e.preventDefault()
    
    if (!isEmpty(errors)) {
      errorsInStep.map(field => setFieldTouched(field, true))

      if (!errorsInStep.length) {
        nextPage()
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

    if (page === 2 && !values.agreed) {
      setFieldTouched('agreed', true)
      return
    }

    nextPage()
  }

  /* 만약 에러가 난 상태로 다음 단계로 넘어가려 하면 에러 표시 */
  if (errorsInStep.length && !isEmpty(errors)) {
    errorsInStep.map(field => setFieldTouched(field, true))
    return
  }
}

/* eslint-disable no-template-curly-in-string */
export const setLocaleErrorMessage = () => setLocale({
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

export const validationSchema = ({ user }) => (
  yup.object().shape({

    /* 소셜 유저는 이메일/패스워드를 검증하지 않음 */
    email: !user.social ? yup.string().required()
    .max(40).test(noDuplicateEmail).email() : yup.string(),
    password: !user.social ? yup.string()
    .matches(/^[a-zA-Z0-9\s`~!@#$%^&*()-_+={}<>,.'"|]+$/g, '영문, 숫자, 공백, 특수문자만사용가능합니다.')
    .required().min(8).max(64) : yup.string(),
    agreed: yup.boolean().oneOf([true]),
    name: yup.string().matches(/^[가-힇]+$/g, '공백, 영문, 자모음 형태는 허용되지 않습니다.')
    .required().max(24),
    phone: yup.string().required().min(11, '11자리 모두 입력해주세요.'),
    postcode: yup.string().required(),
    address1: yup.string().required(),
    address2: yup.string().required().max(64),
  })
)

export const handleSubmit = (values, { props, setSubmitting }) => {
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

        // 새로고침해서 App의 componentWillMount를 trigger
        window.location.reload()
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

        // 새로고침해서 App의 componentWillMount를 trigger
        window.location.reload()
      } else {
        alert('가입 실패')
      }
    }).catch((errors) => {
      setSubmitting(false)
          
      alert(`${errors}`)
    })
  }
}