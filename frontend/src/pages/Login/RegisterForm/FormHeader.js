import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Typography from 'shared/Typography'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FormHeader = ({
  page,
  pageNames,
}) => {
  return (
    <Wrapper>
      <Typography
        type="display2"
      >
        {`전체 ${pageNames.length}단계 (현재: ${page}단계 )`}
      </Typography>
      <Typography
        type="subheading"
        bold="true"
      >{`${page} 단계: ${pageNames[page - 1]}`}</Typography>
    </Wrapper>
  )
}

FormHeader.propTypes = {
  page: PropTypes.number.isRequired,
  pageNames: PropTypes.arrayOf(PropTypes.string),
}

export default FormHeader