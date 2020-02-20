import gql from 'graphql-tag'

export const SIGN_UP = gql`
  mutation($email: String!, $password: String!, $firstName: String!, $lastName: String, $username: String!) {
    signUp(data: {
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName,
      username: $username
    })
  }
`