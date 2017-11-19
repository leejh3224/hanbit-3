import { css } from 'styled-components'

export default css`
  color: ${({ color = 'black', theme }) => theme.color[color]};
  background-color: ${({ background, theme }) => theme.color[background]};
`