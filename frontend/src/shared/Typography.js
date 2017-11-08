import styled from 'styled-components'
import Typography from 'material-ui/Typography'

export default styled(Typography)`
  // light or bold
  font-weight: ${props => props['data-bold'] ? 700 : 200} !important;
`


