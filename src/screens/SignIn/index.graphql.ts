import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(data: {
      email: $email,
      password: $password
    })
  }
`