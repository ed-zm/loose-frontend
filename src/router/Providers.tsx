import React from 'react'
import apollo from '../config/apollo'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'

const Providers = ({ children }) => {
  const client = apollo('')
  return(
    <ApolloProvider client = { client }>
    <ApolloHooksProvider client = { client }>
      { children }
    </ApolloHooksProvider>
    </ApolloProvider>
  )
}

export default Providers