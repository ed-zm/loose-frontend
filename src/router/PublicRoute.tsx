import React from 'react'
import Providers from './Providers'
import getEnv from '../utils/getEnv'
import '../styles/index.scss'

const PublicRoute = (ComposedComponent) => {
  const Component = props =>
    <Providers>
      <ComposedComponent { ...props } />
    </Providers>

  Component.getInitialProps = async ({ req }) => {
    const env = getEnv(process.env)
    return({ loggedIn: false, env })
  }
  return Component
}
  
export default PublicRoute