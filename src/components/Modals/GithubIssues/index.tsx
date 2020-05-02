import React from 'react'
import Button from '../../Button'

const GithubIssues = ({ clientId, issues = [] }) => {
  const open = issues.filter(issue => !issue.closedAt)
  const closed = issues.filter(issue => !!issue.closedAt)
  return(
    <div>
      Found {issues.length}
      Open {open.length}
      Closed {closed.length}
      <Button onClick = {}>
        Import All
      </Button>
      <Button onClick = {}>
        Import Open
      </Button>
    </div>
  )
}