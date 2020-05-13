import React from 'react'
import useGithubIssues from 'loose-components/src/components/Modals/GithubIssues'
import ClipLoader from "react-spinners/ClipLoader";
import GithubButton from '../../GithubButton'
import './index.scss'
import Button from '../../Button'



const GithubIssues = ({ repo, organization, closeModal }) => {
  const {
    issues,
    open,
    closed,
    loadingIssues,
    onImportGithubIssues,
  } = useGithubIssues({ organization, repository: repo})
  if(loadingIssues) return <ClipLoader
    size={20}
    color={"333333"}
    loading={true}
  />
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
        <GithubButton onClick = { () => onImportGithubIssues(false)}>
          Import All
        </GithubButton>
        <GithubButton onClick = {() => onImportGithubIssues(true)}>
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