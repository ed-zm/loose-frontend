import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import apollo from '../config/apollo'
import Providers from './Providers'

const PrivateRoute = (ComposedComponent) => {
  const Component = ({ token, ...props}) => {
    if(!token && process.browser) props.url.push('/sign-in')
    return(
    <Providers token = {props.token}>
      <ComposedComponent { ...props } />
    </Providers>
    )
  }

  Component.getInitialProps = async (ctx) => {
    let userAgent, token = ''
    if(!process.browser) {
      userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
      token = ctx && ctx.req && ctx.req.cookies && ctx.req.cookies.token ?
      ctx.req.cookies.token : ''
    } else {
      userAgent = navigator.userAgent
      token = Cookies.get('token')
    }
    if(!process.browser) apollo(token)
    return({ token })
  }
  return Component
  }
  
export default PrivateRoute