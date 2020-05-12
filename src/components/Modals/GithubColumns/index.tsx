import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import List from '../../List'
import Button from '../../Button'
import GithubButton from '../../GithubButton'

const GITHUB_COLUMNS = gql`
    query githubColumns($organizationId: ID!, $projectId: ID!) {
        githubColumns(
            organizationId: $organizationId,
            projectId: $projectId
        )
        {
            id
            name
            updatedAt
        }
    }
`

const GithubColumns = ({ project, organization, closeModal }) => {
    const { data, loading, error } = useQuery(GITHUB_COLUMNS, {
        variables: {
            organizationId: organization.id,
            projectId: project.id
        }
    })
    console.log(data, error)
  return(
    <div>
      <List
        items = {data && data.githubColumns}
        renderItem = { column =>
            <li>{column.name}
            <GithubButton onClick = {() => {
            }}>
                Import Cards
            </GithubButton>
            </li>
        }
      />
      <Button onClick = { closeModal }>
        Cancel
      </Button>
    </div>
  )
}

export default GithubColumns