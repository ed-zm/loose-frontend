import gql from 'graphql-tag'

export const TASK = gql`
  query($where: TaskWhereUniqueInput!) {
    task(where: $where) {
      id
      title
      description
      state
      code
      labels {
        id
        color
      }
      createdBy {
        id
      }
      organization {
        id
      }
      createdAt
    }
  }
`