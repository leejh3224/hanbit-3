import React from 'react'
import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'
import FavoriteIcon from 'material-ui-icons/Favorite'
import HomeIcon from 'material-ui-icons/Home'
import LockOpenIcon from 'material-ui-icons/LockOpen'
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'
import PersonIcon from 'material-ui-icons/Person'

import Wrapper from 'shared/Wrapper'
import List, { ListItem } from 'shared/List'
import Typography from 'shared/Typography'
import Link from 'shared/Link'

import { visibilityEnhancer } from 'lib/enhancer'

const AppDrawer = ({
  Trigger,
  isVisible,
  setVisibility,
}) => {
  const DrawerItem = ({
    Icon,
    name,
    to,
  }) => {
    const L = ({ children }) => name === '로그아웃' ? 
      <a href={to}>{children}</a> : 
      <Link to={to} onClick={() => setVisibility(false)}>{children}</Link>

    return (
      <L>
        <ListItem 
          divider
          alignitems="center"
        >
          <Icon />
          <Typography 
            type="display2"
            marginleft={2}
            margintop={0.5}
          >
            {name}
          </Typography>
        </ListItem>
      </L>
    )
  }

  return (
    <Wrapper column="true">
      <Trigger onClick={() => setVisibility(true)} />
      <Drawer
        anchor="left"
        open={isVisible}
        onRequestClose={() => setVisibility(false)}
      >
        <List 
          column="true"
          width={220}
        >
          <ListItem 
            divider
            justifycontent="center"
            background="primary"
          >
            <Typography 
              type="display1"
              color="white"
            >
              Hanbit
            </Typography>
          </ListItem>
          <DrawerItem 
            name="홈" 
            Icon={HomeIcon} 
            to="/"
          />
          <DrawerItem 
            name="찜한 상품" 
            Icon={FavoriteIcon} 
            to="/cart"
          />
          <DrawerItem 
            name="장바구니" 
            Icon={ShoppingCartIcon} 
            to="/cart"
          />
          <DrawerItem 
            name="내 정보"
            Icon={PersonIcon}
            to="/profile"
          />
          <DrawerItem 
            name="로그아웃" 
            Icon={LockOpenIcon} 
            to="http://127.0.0.1:8080/users/logout"
          />
          <ListItem 
            divider
            column="true"
            flex={1}
            alignitems="center"
            justifycontent="flex-end"
          >
            <Typography 
              type="display1"
              color="grey"
            >
              2017 Hanbit
            </Typography>
          </ListItem>
        </List>
      </Drawer>
    </Wrapper>
  )
}

AppDrawer.propTypes = {

}

export default visibilityEnhancer()(AppDrawer)