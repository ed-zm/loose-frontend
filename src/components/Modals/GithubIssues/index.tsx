import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ClipLoader from "react-spinners/ClipLoader";
import GithubButton from '../../GithubButton'
import './index.scss'
import Button from '../../Button'

const GITHUB_ISSUES = gql`
  query($organizationId: ID!, $repository: String!) {
    issues(organizationId: $organizationId, repository: $repository) {
      id
      title
      state
      number
      updatedAt
      createdAt
      closedAt
      url
      body
      comments
    }
  }
`

const GithubIssues = ({ repo, organization, closeModal }) => {
  const { data, loading: loadingIssues } = useQuery(GITHUB_ISSUES, {
    variables: {
      repository: repo.fullName,
      organizationId: organization.id
    }
  })
  const open = data && data.issues ? data.issues.filter(issue => !issue.closedAt) : []
  const closed = data && data.issues ? data.issues.filter(issue => !!issue.closedAt) : []
  if(loadingIssues) return <ClipLoader
    size={20}
    color={"333333"}
    loading={true}
  />
  return(
    <div className = 'github-issues-modal'>
      <div>
        <span className = 'github-issues-modal-key'>Found:{' '}</span>
        <span className = 'github-issues-modal-value'>{data && data.issues ? data.issues.length : 0}</span>
      </div>
      <div>
        <span className = 'github-issues-modal-key'>Open:{' '}</span>
        <span className = 'github-issues-modal-value'>{open.length}</span>
      </div>
      <div>
        <span className = 'github-issues-modal-key'> Closed:{' '}</span>
        <span className = 'github-issues-modal-value'>{closed.length}</span>
      </div>
      <div className = 'github-issues-modal-import-buttons'>
        <GithubButton onClick = {() => {}}>
          Import All
        </GithubButton>
        <GithubButton onClick = {() => {}}>
          Import Open
        </GithubButton>
      </div>
      <Button className = 'github-issues-modal-button' onClick = { closeModal }>
        Cancel
      </Button>
    </div>
  )
}

export default GithubIssues