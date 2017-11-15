import styled from 'styled-components'

import Absolute from 'lib/Absolute'

import Button from 'material-ui/Button'

export const PrimaryButton = styled(Button)`
  && {
    color: #fff;
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 5px;
    flex: ${({ flex }) => flex && 1};
    ${({ absolute, top, right, bottom, left }) => Absolute(absolute, top, right, bottom, left)};

    &:hover {
      background-color: ${({ theme }) => theme.color.primaryHover};
    }
  }
`

export const WhiteButton = PrimaryButton.extend`
  && {
    color: #000;
    background-color: #fff;
    border: 1px solid #000;

    // 아이콘 버튼과 높이를 맞추기 위해
    height: 36px;

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteHover};;
    }
  }
`

export const RoundButton = PrimaryButton.extend`
  && {
    // override default button width
    min-width: ${({ diameter }) => diameter}px;
    min-height: ${({ diameter }) => diameter}px;
    border-radius: 100%;
    padding: 0;
  }
`