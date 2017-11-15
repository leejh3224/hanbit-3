import { css } from 'styled-components'

export default (
  absolute = false,
  top, 
  right, 
  bottom, 
  left,
) => css`
  position: ${absolute && 'absolute'};
  top: ${top}px;
  right: ${right}px;
  bottom: ${bottom}px;
  left: ${left}px;
`