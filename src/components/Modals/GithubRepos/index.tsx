import React from 'react'
import axios from 'axios'
import List from '../../List'
import Button from '../../Button'
import RepositoryCard from '../../RepositoryCard'

const GithubRepos = ({ repos = [] }) => {
  console.log('GITHUB')
  const importIssues = async (repo) => {
    const response = await axios.get(
      `https://api.github.com/repos/${repo.full_name}/issues`
    )
    if(response && response.status === 200) {
    }
  }
  return(
    <div>
      <List
        items = {repos}
        renderItem = { repo => <RepositoryCard repo = {repo} importButton/>}
      />
    </div>
  )
}

export default GithubRepos