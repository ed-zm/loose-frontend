import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GithubButton from '../../GithubButton'
import './index.scss'
import Button from '../../Button'

const GithubIssues = ({ repo, organization, closeModal }) => {
  const [ issues, setIssues ] = useState([])
  const open = issues.filter(issue => !issue.closedAt)
  const closed = issues.filter(issue => !!issue.closedAt)
  useEffect(() => {
    new Promise(async resolve => {
      const response = await axios.get(
        `https://api.github.com/repos/${repo.full_name}/issues`,
        {
          headers: {
            Authorization: `token ${organization.githubToken}`
          }
        }
      )
      if(response && response.status === 200) {
        setIssues(response.data)
      }
      resolve()
    })
  })
  return(
    <div className = 'github-issues-modal'>
      <div>
        <span className = 'github-issues-modal-key'>Found:{' '}</span>
        <span className = 'github-issues-modal-value'>{issues.length}</span>
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