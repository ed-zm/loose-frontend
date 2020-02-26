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
  mutation(
    $title: String!,
    $description: String!,
    $creatorId: ID!,
    $organizationId: ID
  ) {
    createTask(data: {
      title: $title,
      description: $description,
      createdBy: {
        connect: {
          id: $creatorId
        }
      }
      organization: {
        connect: {
          id: $organizationId
        }
      }
    }) {
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