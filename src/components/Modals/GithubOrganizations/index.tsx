import React, {} from 'react'
import useGithubOrganizations from 'loose-components/src/components/Modals/GithubOrganizations'
import List from '../../List'
import Button from '../../Button'
import GithubButton from '../../GithubButton'
import './index.scss'




const GithubOrganizations = ({ organization, closeModal }) => {
  const {
    githubOrganizations,
    linkingOrganization,
    linkOrganizationError,
    onLinkOrganization
  } = useGithubOrganizations({
    organization
  })
  return(
    <div className = 'github-orgs-modal'>
      <List
        items = { githubOrganizations }
        renderItem = { org => <li>
            <h4>{org.login}</h4>
            <GithubButton onClick = { () => onLinkOrganization(org) } disabled = { linkingOrganization }>
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