import styled from 'styled-components'

import Typography from 'shared/Typography'

const ErrorMessage = styled(Typography).attrs({
  type: 'display3',
})`
  && {
    color: ${({ theme }) => theme.color.error};
  }
`

export default ErrorMessage