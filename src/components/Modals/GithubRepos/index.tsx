import React from 'react'
import List from '../../List'
import Button from '../../Button'
import RepositoryCard from '../../RepositoryCard'
import './index.scss'

const GithubRepos = ({ repos = [], organization, closeModal }) => {
  return(
    <div className = 'github-repos-modal'>
      <List
        items = {repos}
        renderItem = { repo => <RepositoryCard repo = {repo} organization = {organization} importButton/>}
      />
      <Button className = 'github-repos-modal-button' onClick = { closeModal }>
        Cancel
      </Button>
    </div>
  )
}

export default GithubRepos