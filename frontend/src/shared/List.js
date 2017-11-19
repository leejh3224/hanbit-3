import styled from 'styled-components'
import List, { ListItem as StyledListItem } from 'material-ui/List'
import common from 'lib/css-helper'

export const ListItem = styled(StyledListItem).attrs({
  padding: ({ padding = 2 }) => padding,
  background: ({ background = 'white' }) => background,
})`
  && {
    ${common};
  }
`

export default styled(List)`
  && {
    ${common};
  }
`
