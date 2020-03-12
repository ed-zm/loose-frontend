import gql from 'graphql-tag'

export const TASK = gql`
  query($where: TaskWhereUniqueInput!) {
    task(where: $where) {
      id
      title
      description
      state
      code
      assignedTo {
        id
        firstName
        lastName
      }
      labels {
        id
        text
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

export const USERS = gql`
  query($assignedToId: ID!) {
    users(where: {
      id_not: $assignedToId
    }) {
      id
      firstName
      lastName
    }
  }
`

export const ASSIGN_TASK = gql`
  mutation assignTask($id: ID!, $userId: ID!) {
    updateTask(
      where: { id: $id },
      data: {
        assignedTo: {
          connect: {
            id: $userId
          }
        }
      }
    ) {
      id
      state
      assignedTo {
        id
        firstName
        lastName
      }
    }
  }
`

export const UNASSIGN_TASK = gql`
  mutation assignTask($id: ID!, $userId: ID!) {
    updateTask(
      where: { id: $id },
      data: {
        assignedTo: {
          disconnect: {
            id: $userId
          }
        }
      }
    ) {
      id
      state
      assignedTo {
        id
        firstName
        lastName
      }
    }
  }
`

export const TASK_COMMENTS = gql`
  query($taskId: ID!) {
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
  mutation($text: String!, $taskId: ID!, $userId: ID!) {
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