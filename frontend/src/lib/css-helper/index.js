import { css } from 'styled-components'

import position from './position'
import space from './space'
import color from './color'
import border from './border'
import flexbox from './flexbox'
import size from './size'

export default css`
  ${position};
  ${space};
  ${color};
  ${border};
  ${flexbox};
  ${size};
  box-shadow: ${({ boxshadow }) => boxshadow};
`