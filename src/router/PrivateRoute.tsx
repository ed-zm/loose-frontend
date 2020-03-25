import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import Cookies from 'js-cookie'
import initApollo from '../config/apollo'
import Providers from './Providers'
import Sidebar from '../components/Sidebar'
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
          <div>Header</div>
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
    let userAgent, token = '', user = null
    if(!process.browser) {
      userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
      token = ctx && ctx.req && ctx.req.cookies && ctx.req.cookies.token ?
      ctx.req.cookies.token : ''
    } else {
      userAgent = navigator.userAgent
      token = Cookies.get('token')
    }
    if(!process.browser) {
      const apollo = initApollo(token)
      try {
        user = await apollo.query({
          query: LOGGED_IN
        })
      } catch(e) {
        console.log(e)
      }
    }
    return({ token, user })
  }
  return Component
  }
  
export default PrivateRoute