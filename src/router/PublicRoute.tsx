import React from 'react'
import Providers from './Providers'
import '../styles/index.scss'

const PublicRoute = (ComposedComponent) => {
  const Component = props =>
    <Providers>
      <ComposedComponent { ...props } />
    </Providers>

  Component.getInitialProps = async ({ req }) => {
    return({ loggedIn: false })
  }
  return Component
}
  
export default PublicRoute