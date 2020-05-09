import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import List from '../../List'
import Button from '../../Button'
import GithubButton from '../../GithubButton'
import './index.scss'

const GITHUB_ORGANIZATIONS = gql`
    query($organizationId: ID!) {
        githubOrganizations(organizationId: $organizationId) {
            id
            login
            description
        }
    }
`

const GithubOrganizations = ({ organization, closeModal }) => {
    const { data } = useQuery(GITHUB_ORGANIZATIONS, {
        variables: { organizationId: organization.id}
    })
  return(
    <div className = 'github-orgs-modal'>
      <List
        items = {data && data.githubOrganizations }
        renderItem = { org => <li>
            <h4>{org.login}</h4>
            <GithubButton onClick = { () => {}}>
                Select
            </GithubButton>
        </li>}
      />
      <Button className = 'github-orgs-modal-button' onClick = { closeModal }>
        Cancel
      </Button>
    </div>
  )
}

export default GithubOrganizations