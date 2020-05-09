import React from 'react'
import Providers from './Providers'
import getEnv from '../utils/getEnv'
import getConfig from 'next/config'
import '../styles/index.scss'

const PublicRoute = (ComposedComponent) => {
  const Component = props =>
    <Providers>
      <ComposedComponent { ...props } />
    </Providers>

  Component.getInitialProps = async ({ req }) => {
    const config = getConfig()
    const env = getEnv(config)
    return({ loggedIn: false, env })
  }
  return Component
}
  
export default PublicRoute