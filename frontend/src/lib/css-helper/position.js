import { css } from 'styled-components'

const autoOrNum = position => typeof position === 'string' ? position : `${position * 8}px`

export default css`
  && {
    position: ${({ position }) => position};
    top: ${({ top }) => autoOrNum(top)};
    right: ${({ right }) => autoOrNum(right)};
    bottom: ${({ bottom }) => autoOrNum(bottom)};
    left: ${({ left }) => autoOrNum(left)};
  }
`