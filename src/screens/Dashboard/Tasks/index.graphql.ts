import gql from 'graphql-tag'

export const TASKS = gql`
  query {
    tasks {
      id
      title
      description
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

export const CREATE_TASK = gql`
  mutation($data: TaskCreateInput!) {
    createTask(data: $data) {
      id
      title
      description
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

export const ORGANIZATIONS = gql`
  query {
    organizations {
      id
      name
    }
  }
`