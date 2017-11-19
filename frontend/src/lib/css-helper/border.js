import { css } from 'styled-components'

const convertToHexColor = (border, theme) => {
  if (border) {

    /* 
     * 색깔 부분만 잘라내고
     * prop을 1px solid grey 이런 식으로 보냈을 때
     * 색깔 부분을 theme.color에서 가져올 수 있도록
     * $3 즉 세 번째 부분을 바꿔줌
     */
    const color = border.split(' ')[2]
    const regex = /(\w+)\s(\w+)\s(\w+)/

    return border.replace(regex, `$1 $2 ${theme.color[color]}`)
  }
}

export default css`
  border: ${({ border, theme }) => convertToHexColor(border, theme)};
  border-left: ${({ borderleft, theme }) => convertToHexColor(borderleft, theme)};
  border-right: ${({ borderright, theme }) => convertToHexColor(borderright, theme)};
  border-top: ${({ bordertop, theme }) => convertToHexColor(bordertop, theme)};
  border-bottom: ${({ borderbottom, theme }) => convertToHexColor(borderbottom, theme)};
  border-radius: ${({ borderradius }) => borderradius}px;
`