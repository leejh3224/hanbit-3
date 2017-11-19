import { css } from 'styled-components'

export default css`
  && {
    display: flex;
    box-sizing: border-box;
    flex-direction: ${({ column }) => column && 'column'};
    
    // alignment
    justify-content: ${({ justifycontent }) => justifycontent};
    align-items: ${({ alignitems }) => alignitems};
    justify-self: ${({ justifyself }) => justifyself};
    align-self: ${({ alignself }) => alignself};

    // wrap
    flex-wrap: ${({ wrap }) => wrap && 'wrap'};

    // flex
    flex: ${({ flex }) => flex};
  }
`