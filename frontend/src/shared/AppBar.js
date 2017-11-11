import styled from 'styled-components'
import AppBar from 'material-ui/AppBar'

export default styled(AppBar)`
  && {
    min-height: 3.3em;
    background-color: ${(props) => props['data-transparent'] ? `rgba(255, 255, 255, 0.7)` : '#fff'};
  }
`