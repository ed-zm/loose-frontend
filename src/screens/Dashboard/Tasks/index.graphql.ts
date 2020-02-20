import gql from 'graphql-tag'

export const TASKS = gql`
  query {
    tasks {
      id
      title
      createdAt
    }
  }
`