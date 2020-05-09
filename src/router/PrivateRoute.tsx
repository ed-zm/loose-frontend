import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import nextCookies from 'next-cookies'
import Cookies from 'js-cookie'
import initApollo from '../config/apollo'
import Providers from './Providers'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import getEnv from '../utils/getEnv'
import '../styles/index.scss'

const LOGGED_IN = gql`
query {
  loggedIn {
    id
    firstName
    lastName
    username
  }
}`

const PrivateRoute = (ComposedComponent) => {
  const Component = ({ token, user, ...props}) => {
    if((!user || !user.data.loggedIn) && process.browser) props.url.push('/sign-in')
    return(
    <Providers user = {user ? user.data.loggedIn : null } token = {props.token}>
      <div className = 'main-layout'>
        <div className = 'header-layout'>
          <Header />
        </div>
        <div className = 'sidebar-layout'>
          <Sidebar />
        </div>
        <div className = 'content-layout'>
          <ComposedComponent { ...props } />
        </div>
      </div>
    </Providers>
    )
  }

  Component.getInitialProps = async (ctx) => {
    let userAgent, user = null, token = ''
    if(!process.browser) {
      userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
      token = nextCookies(ctx).token
    } else {
      userAgent = navigator.userAgent
      token = Cookies.get('token')
    }
    const apollo = initApollo(token)
    try {
      user = await apollo.query({
        query: LOGGED_IN
      })
    } catch(e) {
      console.log(e)
    }
    const env = getEnv(process.env)
    console.log('ENV', env, process.env)
    return({ token, user, env })
  }
  return Component
  }
  
export default PrivateRoute