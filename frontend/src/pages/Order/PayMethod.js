import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import yup from 'yup'

import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

import Wrapper from 'shared/Wrapper'
import { PrimaryButton } from 'shared/Button'
import { ListItem } from 'shared/List'

import IMP from 'lib/IMP'

IMP.init()

const Form = Wrapper.withComponent('form')

const PayMethod = ({
  values,
  handleSubmit,
  handleChange,
}) => {
  const { paymethod } = values

  return (
    <ListItem 
      disableGutters
      paddingtop={1}
      paddingbottom={1}
    >
      <Form 
        onSubmit={handleSubmit}
        column="true"
        fullwidth
      >
        <RadioGroup
          name="paymethod"
          value={paymethod}
          onChange={handleChange}
        >
          <FormControlLabel value="card-naver" control={<Radio />} label="네이버페이" />
          <FormControlLabel value="card-payco" control={<Radio />} label="페이코" />
          <FormControlLabel value="card" control={<Radio />} label="카드" />
          <FormControlLabel value="vbank" control={<Radio />} label="무통장입금" />
          <FormControlLabel value="trans" control={<Radio />} label="계좌이체" />
          <FormControlLabel value="phone" control={<Radio />} label="휴대폰 소액결제" />
        </RadioGroup>
        <PrimaryButton
          type="submit"
          fullwidth
          margintop={1}
        >
          진행하기
        </PrimaryButton>
      </Form>
    </ListItem>
  )
}

PayMethod.propTypes = {

}

export default withFormik({
  mapPropsToValues: () => ({
   paymethod: 'card-naver',
  }),
  validationSchema: yup.object().shape({

  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const { paymethod } = values
    const { product } = props
    const { name, low_price } = product

    IMP.request_pay({
      pg: 'kakao',
      pay_method: paymethod,
      merchant_uid: 'cnstest25m',
      name,
      amount: low_price,
      m_redirect_url: 'https://www.yourdomain.com/payments/complete'
    }, (rsp) => {
      if ( rsp.success ) {
          var msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;
      } else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
      }
      alert(msg);
    })
  }
})(PayMethod)