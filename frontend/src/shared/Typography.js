import styled from 'styled-components'
import Typography from 'material-ui/Typography'

export default styled(Typography)`
  // light or bold
  && {
    font-weight: ${({ bold }) => bold ? 700 : 400};
  }
`


