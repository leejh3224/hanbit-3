import styled from 'styled-components'
import upperFirst from 'lodash/upperFirst'

import common from 'lib/css-helper'

import Button from 'material-ui/Button'

export const PrimaryButton = styled(Button).attrs({
  background: ({ background = 'primary' }) => background,
  color: ({ color = 'white' }) => color,
  flex: ({ flex = 1 }) => flex,
})`
  && {
    min-width: ${({ width = 88 }) => width}px;
    min-height: ${({ height = 36 }) => height}px;
    border-radius: 5px;
    ${common};

    &:hover {
      background-color: ${({ theme, background = 'primary' }) => 
        theme.color[`light${upperFirst(background)}`]};
    }
  }
`

export const WhiteButton = styled(PrimaryButton).attrs({
  background: 'white',
  color: 'black',
  border: ({ border = '1px solid #000' }) => border,
})`
`

export const RoundButton = PrimaryButton.extend`
  && {
    // override default button width
    min-width: ${({ diameter }) => diameter}px;
    min-height: ${({ diameter }) => diameter}px;
    border-radius: 100%;
  }
`