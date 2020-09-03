import gql from "graphql-tag";

export const UPDATE_TASK = gql`
  mutation($id: ID!, $state: Int!) {
    updateTask(where: { id: $id }, data: { state: $state }) {
      id
      state
    }
  }
`;

export const UPDATE_RESPONSE_REQUEST = gql`
  mutation($id: ID!, $state: Int!) {
    updateResponseRequest(where: { id: $id }, data: { state: $state }) {
      id
      state
    }
  }
`;
