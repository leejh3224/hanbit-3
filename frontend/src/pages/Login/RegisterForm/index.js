import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/* formik */
import { withFormik } from 'formik'
import {
  fields, 
  pageNames,
  handleNextButton,
  setLocaleErrorMessage,
  validationSchema, 
  handleSubmit,
} from './formik'

/* header & steps */
import FormHeader from './FormHeader'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

/* pagination */
import { PaginationEnhancer } from 'lib/enhancer'

import Button from 'material-ui/Button'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import { CircularProgress } from 'material-ui/Progress'

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

const PrevButton = styled(Button).attrs({
  raised: true,
  color: "primary",
})`
  // override default button width
  min-width: 120px;
  margin-top: 24px;
  padding-right: 32px;
`

const NextButton = PrevButton.extend`
  // 로딩 아이콘 위치 조정
  padding-left: ${({ isSubmitting }) => isSubmitting ? 24 : 32}px;
`

const RegisterForm = ({
  isSubmitting,
  handleSubmit,
  setErrors,
  user,
  prevPage,
  ...props,
}) => {
  const { social } = user
  const { page } = props
  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormHeader page={page} pageNames={pageNames} />
      {
        { 
          1: <Step1 {...props} />,
          2: <Step2 {...props} />,
          3: <Step3 {...props} />,
        }[page]
      }
      <ButtonWrapper>
        <PrevButton       
          /* 소셜 로그인을 통해 들어온 유저는 1단계로 갈 수 없게 만듬 */
          disabled={social ? page <= 2 : page <= 1}
          onClick={prevPage}
        >
          <KeyboardArrowLeft />
          이전으로
        </PrevButton>
        <NextButton
          type="submit"
          disabled={isSubmitting}
          onClick={e => handleNextButton(e, props)}
        >
          { 
            isSubmitting ? (
              <CircularProgress
                color="primary"
                size={20}
                thickness={7.2}
              /> 
            ) : '계속하기'
          }
          { !isSubmitting && <KeyboardArrowRight />}
        </NextButton>
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
  page: PropTypes.number.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
}

// local error message
setLocaleErrorMessage()

export default PaginationEnhancer(
  /*
   * @params: initial state, cond1, cond2
   * 소셜 유저는 2단계부터 가입 시작
   */
  ({ user }) => user.social ? 2 : 1,
  ({ setPage, page }) => 
    () => page < 3 && setPage(page + 1),
  ({ setPage, page}) =>
    () => page > 0 && setPage(page - 1),
)(withFormik({

  /* return initial fields */
  mapPropsToValues: fields,
  validationSchema,
  handleSubmit,
})(RegisterForm))