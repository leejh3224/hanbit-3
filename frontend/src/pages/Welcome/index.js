import React from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'

import Template from '../Template'
import Image from 'shared/Image'
import Link from 'shared/Link'
import Typography from 'shared/Typography'

const Welcome = () => {
  return (
    <Template>
      <Image 
        height={'100%'}
        src={require('static/welcome.jpeg')}
        lazy
      >
        <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', background: 'RGBA(255, 255, 255, 0.5)', flexDirection: 'column' }}>
          <Typography
            type="title"
            bold
          >Welcome!</Typography>
          <Typography
            type="subheading"
            bold
          >환영합니다.</Typography>
          <Link to={{
            pathname: "/",
            state: { isLoggedIn: true, register_completed: true  }
          }}>
            <Button
              style={{ minWidth: 300, marginTop: 16 }}
            >회원정보 수정하기</Button>
          </Link>
          <Link to={{
            pathname: "/",
            state: { isLoggedIn: true, register_completed: true  }
          }}>
            <Button
              style={{ minWidth: 300 }}
            >둘러보기</Button> 
          </Link>
        </div>
      </Image>
    </Template>
  )
}

Welcome.propTypes = {

}

export default Welcome