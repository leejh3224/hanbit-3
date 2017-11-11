import styled from 'styled-components'
import Typography from 'material-ui/Typography'

const mediaFontSizes = {
  "subheading": 28,
}

export default styled(Typography)`
  // light or bold
  && {
    font-weight: ${props => props['data-bold'] ? 700 : 200};

    // media queries
    @media(max-width: 40em) {
      padding-top: ${(props) => props['data-padding-top-m']}px;
      font-size: ${({ type }) => mediaFontSizes[type]}px;
    }
  }
`


