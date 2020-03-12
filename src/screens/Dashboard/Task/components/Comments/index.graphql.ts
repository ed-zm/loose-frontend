import gql from 'graphql-tag'

export const COMMENTS = gql`
  query comments($taskId: ID!) {
    comments(where: {
      task: {
        id: $taskId
      }
    }) {
      id
      text
      createdAt
      task {
        id
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation createComment($text: String!, $taskId: ID!, $userId: ID!) {
    createComment(data: {
      text: $text,
      user: {
        connect: {
          id: $userId
        }
      },
      task:{
        connect: {
          id: $taskId
        }
      }
    }) {
      id
      text
      createdAt
      task {
        id
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`