import React from 'react'
import apollo from '../config/apollo'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Contexts from 'loose-components/src/contexts'

const Providers = ({ token, user, children }) => {
  const client = apollo(token)
  return(
    <ApolloProvider client = { client }>
    <ApolloHooksProvider client = { client }>
      <Contexts user = { user }>
        { children }
      </Contexts>
    </ApolloHooksProvider>
    </ApolloProvider>
  )
}

export default Providers