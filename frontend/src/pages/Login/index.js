import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Card, { CardContent } from 'material-ui/Card'

import Template from '../Template'
import Image from 'shared/Image'
import Typography from 'shared/Typography'

const Login = () => {
  return (
    <Template>
      <Card 
        style={{
          display: 'flex',
          margin: 50,
          marginTop: 80,
        }}
      >
        <div style={{ flex: 1}}>
          <Image 
            src={require('static/mac.jpg')}
            height={500}
          />
        </div>
        <CardContent style={{ flex: 2 }}>
          <Typography
            type="subheading"
            bold
          >Login</Typography>
        </CardContent>
      </Card>
    </Template>
  )
}

Login.propTypes = {

}

export default Login