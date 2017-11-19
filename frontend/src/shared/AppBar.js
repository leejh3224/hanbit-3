import styled from 'styled-components'
import AppBar from 'material-ui/AppBar'

import common from 'lib/css-helper'

export default styled(AppBar).attrs({
  fixed: true,
})`
  && {
    min-height: 3.3em;
    ${common};
  }
`