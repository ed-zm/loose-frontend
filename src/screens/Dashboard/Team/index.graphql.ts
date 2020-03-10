import gql from 'graphql-tag'

export const TEAM = gql`
  query($id: ID!) {
    team(where: {
      id: $id
    }) {
      id
      name
      users {
        id
        firstName
        lastName
      }
    }
  }
`