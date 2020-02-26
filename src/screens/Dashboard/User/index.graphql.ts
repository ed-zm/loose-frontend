import gql from 'graphql-tag'

export const USER = gql`
  query($id: ID!) {
    user(where: { id: $id }) {
      id
      username
      firstName
      lastName
      email
    }
  }
`