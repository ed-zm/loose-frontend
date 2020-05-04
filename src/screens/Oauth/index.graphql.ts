import gql from 'graphql-tag'

export const SAVE_ORGANIZATION_GITHUB_TOKEN = gql`
  mutation saveOrganizationGithubToken($organizationId: ID!, $token: String!) {
    updateOrganization(
      where: {
        id: $$organizationId
      },
      data: {
        githunToken: $token
      }
    ) {
      id
      githubToken
    }
  }
`

export const GITHUB_LOGIN = gql`
  mutation($code: String!) {
    githubLogin(code: $code)
  }
`