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

export const CREATE_TASKS = gql`
  mutation(
    $title: String!,
    $description: String!,
    $creatorId: ID!,
    $assignedId: ID,
    $organizationId: ID!,
    $teamId: ID
  ) {
    createTask(data: {
      title: $title,
      description: $description,
      createdBy: {
        connect: {
          id: $creatorId
        }
      },
      assignedTo: {
        connect: {
          id: $assignedId
        }
      },
      organization: {
        connect: {
          id: $organizationId
        }
      },
      team: {
        connect: {
          id: $teamId
        }
      }
    }) {
      id
      title
      description
      createdBy {
        id
      }
      assignedTo {
        id
      }
      organization {
        id
      }
      team {
        id
      }
    }
  }
`