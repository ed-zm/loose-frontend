import gql from 'graphql-tag'

export const LABELS = gql`
  query labels($taskId: ID!) {
    labels(where: {
      tasks_some: {
        id: $taskId
      }
    }) {
      id
      color
      text
    }
  }
`

export const ADD_LABEL = gql`
  mutation addLabel($text: String!, $taskId: ID!) {
    createLabel(data: {
      text: $text,
      color: "green",
      tasks: {
        connect: [ { id: $taskId } ]
      }
    }) {
      id
      color
      text
    }
  }
`