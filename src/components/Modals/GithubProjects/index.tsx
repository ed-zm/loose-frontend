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
        renderItem = { repo => <li>{JSON.stringify(repo)}</li>}
      />
      <Button className = 'github-repos-modal-button' onClick = { closeModal }>
        Cancel
      </Button>
    </div>
  )
}

export default GithubRepos