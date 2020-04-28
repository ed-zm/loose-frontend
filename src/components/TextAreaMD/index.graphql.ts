import gql from 'graphql-tag'

export const GET_S3_SIGNED_URL = gql`
  query getS3SignedUrl($id: ID!, $fileType: String!, $operation: String!, $random: Boolean) {
    getS3SignedUrl (
      fileType: $fileType,
      operation: $operation,
      id: $id,
      random: $random
    )
  }
`