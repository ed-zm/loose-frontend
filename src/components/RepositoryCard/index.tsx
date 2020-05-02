import React from 'react'
import GithubButton from '../GithubButton'
import './index.scss'

const RepositoryCard = ({ repo, importButton }) => {
  return(
    <div className = 'repository-card'>
      <div className = 'repository-card-content'>
        <div className = 'repository-card-content-title'>
          {/* <span className = 'repository-card-content-title-owner'>@ed-zm</span> */}
          <span className = 'repository-card-content-title-name'>{repo.name}</span>
          <span className = 'repository-card-content-title-private'>{repo.private ? 'PRIVATE' : 'PUBLIC'}</span>
        </div>
        <p className = 'repository-card-content-description'>{repo.description ? repo.description : 'No Description'}</p>
        <span className = 'repository-card-content-metadata-key'>Updated 16 days ago</span>
        <div className = 'repository-card-content-metadata'>
          <span className = 'repository-card-content-metadata-key'>{repo.language}</span>
          <div>
            <span className = 'repository-card-content-metadata-key'>Open:{' '}</span>
            <span className = 'repository-card-content-metadata-value'>{repo.open_issues_count}</span>
          </div>
          {/* <div>
            <span className = 'repository-card-content-metadata-key'>Stars:{' '}</span>
            <span className = 'repository-card-content-metadata-value'>{repo.stargazers_count}</span>
          </div>
          <div>
            <span className = 'repository-card-content-metadata-key'>Forks:{' '}</span>
            <span className = 'repository-card-content-metadata-value'>{repo.forks_count}</span>
          </div> */}
        </div>
        
      </div>
      <div className = 'repository-card-actions'>
        {importButton && <GithubButton onClick = {() => {}}>
          Import Issues
        </GithubButton>}
      </div>
    </div>
  )
}

export default RepositoryCard