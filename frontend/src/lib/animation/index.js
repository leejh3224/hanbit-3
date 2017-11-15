import styled, { keyframes } from 'styled-components'
import { 
  fadeIn,
} from 'react-animations'

const getAnimation = animation => keyframes`${animation}`

export const FadeIn = styled.div`
  animation: 0.5s ${getAnimation(fadeIn)};
  width: 100%;
  min-height: inherit;
`