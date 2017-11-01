import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'

const animation = keyframes`${fadeIn}`

const FadeIn = styled.div`
  animation: 0.5s ${animation};
`

export default FadeIn