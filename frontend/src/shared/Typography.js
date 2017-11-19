import styled from 'styled-components'

import Typography from 'material-ui/Typography'

import common from 'lib/css-helper'

export default styled(Typography)`
  // light or bold
  && {
    font-weight: ${({ bold }) => bold ? 700 : 400};
    ${common};
  }
`


