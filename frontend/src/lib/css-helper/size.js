import { css } from 'styled-components'

export default css`
  width: ${({ width, fullwidth }) => fullwidth ? '100%' : `${width}px`};
  max-width: ${({ maxwidth }) => maxwidth};
  height: ${({ height, fullheight }) => fullheight ? '100%' : `${height}px`};
`