import { css } from 'styled-components'

export default css`
  && {
    // margin-auto => string
    margin: ${({ margin = 0 }) => typeof margin === 'string' ? margin : `${margin * 8}px`};

    // margin
    margin-top: ${({ margintop = 0 }) => margintop * 8}px;
    margin-right: ${({ marginright = 0 }) => marginright * 8}px;
    margin-bottom: ${({ marginbottom = 0 }) => marginbottom * 8}px;
    margin-left: ${({ marginleft = 0 }) => marginleft * 8}px;

    // padding
    padding: ${({ padding = 0 }) => padding * 8}px;
    padding-top: ${({ paddingtop }) => paddingtop * 8}px;
    padding-right: ${({ paddingright }) => paddingright * 8}px;
    padding-bottom: ${({ paddingbottom }) => paddingbottom * 8}px;
    padding-left: ${({ paddingleft }) => paddingleft * 8}px;
  }
`