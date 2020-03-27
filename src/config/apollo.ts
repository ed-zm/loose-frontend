import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'
import { /*split, */ ApolloLink } from 'apollo-link'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

let apolloClient = null
let link
if(!process.browser) {
  //ts-ignore
  global.fetch = fetch
}
const create = token => {
  const httpLink = new BatchHttpLink({
    // uri: process.env.NODE_ENV === 'production' ? 'http://localhost/api' : 'http://localhost:8001',
    uri: 'http://localhost:8001',
    credentials: 'same-origin'
  })
  link = httpLink
  const authLink = setContext(() => {
    const tkn = process.browser ? Cookies.get('token') : token
    return {
      headers: {
        Authorization: tkn ? tkn : ''
      }
    }
  })
  // if(process.browser) {
  //   const wsLink = new WebSocketLink({
  //     uri: 'http://localhost:8001',
  //     options: {
  //       reconnect: true,
  //       timeout: 60000
  //     }
  //   })

  //   link = split(({ query}) => {
  //       //ts-ignore
  //       const { kind, operation } = getMainDefinition(query)
  //       return kind === 'OperationDefinition' && operation === 'subscription'
  //     },
  //     wsLink,
  //     httpLink
  //   )
  // }
  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: !process.browser,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if(graphQLErrors) {
          graphQLErrors.map(({ message }) => {
            if(process.browser && process.env.STAGE !== 'prod') console.log(message)
            else console.log('An Unexpected Error has occured')
          })
        }
        if(networkError && process.browser) console.log('There are problems with your Internet', networkError)
      }),
      authLink.concat(link)
    ]),
    cache: new InMemoryCache({
      dataIdFromObject: o => o.id
    })
  })
}

export default token =>{
  if(!process.browser) return create(token)
  if(!apolloClient) apolloClient = create(token)
  return apolloClient
} 