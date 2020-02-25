import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(
      email: $email,
      password: $password
    )
  }
`