import gql from 'graphql-tag'

export const ORGANIZATIONS = gql`
  query {
    organizations {
      id
      name
      owner {
        id
      }
    }
  }
`

export const CREATE_ORGANIZATION = gql`
  mutation($name: String!) {
    createOrganization(data: {
      name: $name
    }) {
      id
      name
      owner {
        id
      }
    }
  }
`

export const ORGANIZATION = gql`
  query($id: ID!) {
    organization(where: { id: $id }) {
      id
      name
      owner {
        id
      }
    }
  }
`