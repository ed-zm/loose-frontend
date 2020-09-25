import gql from "graphql-tag";

export const UPDATE_TASK = gql`
  mutation($id: String!, $state: Int!) {
    updateOneTask(where: { id: $id }, data: { state: { set: $state } }) {
      id
      state
    }
  }
`;

export const UPDATE_RESPONSE_REQUEST = gql`
  mutation($id: String!, $state: Int!) {
    updateOneResponseRequest(where: { id: $id }, data: { state: { set: $state } }) {
      id
      state
    }
  }
`;
