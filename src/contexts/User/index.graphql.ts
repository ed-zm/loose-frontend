import gql from 'graphql-tag'

export const LOGGED_IN = gql`
  query {
    loggedIn {
      id
      firstName
      lastName
      username
    }
  }
`