import React, { useContext } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from 'next/router'
import useOrganization from 'loose-components/src/screens/Dashboard/Organization'
import GithubLogin from 'react-github-login'
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import GithubButton from '../../../components/GithubButton'
import List from '../../../components/List'
import RepositoryCard from '../../../components/RepositoryCard'
import './index.scss'


const Organization = ({ env }) => {
  const router = useRouter()
  const { id } = router.query
  const { actions } = useContext(ModalContext);
  const {
    organization,
    loading,
    error,
    projects,
    loadingProjects,
    projectsError,
    repositories,
    loadingRepositories,
    repositoriesError,
    onSuccess,
    onError,
    tab,
    setTab,
    onUnlinkOrganization
  } = useOrganization({ id })
  console.log('TAB', tab)
  if(!organization) return null
  return(
    <div className = 'organization'>
      <div className = 'organization-profile'>
        <img src = '/default_profile.png' className = 'organization-profile-avatar'/>
        <span className = 'organization-profile-name-text'>{organization.name.toUpperCase()}</span>
          <GithubLogin 
            clientId = {env.GITHUB_CLIENT_ID}
            onSuccess = { onSuccess }
            onError = { onError }
            redirectUri = { `${env.HOST}/oauth` }
            scope = 'repo read:user read:org'
          >
            <GithubButton>
              { organization.githubOrganization ? organization.githubOrganization : 'Connect' }
            </GithubButton>
          </GithubLogin>
          {organization.githubOrganization && <a onClick = { onUnlinkOrganization }>Disconnect</a>}
        <div>Teams</div>
        <div>Users</div>
      </div>
      <div className = 'organization-content'>
        <a onClick = { () => setTab('REPOSITORIES')}>Repositories</a>
        <a onClick = { () => { setTab('PROJECTS') }}>Projects</a>
        { tab === 'REPOSITORIES' && <div>
          { loadingRepositories ?
            <ClipLoader
              size={20}
              color={"333333"}
              loading={true}
            /> :
            <List
              items = {repositories}
              renderItem = { repo => <RepositoryCard repo = {repo} importButton organization = {organization} />}
            />
          }

          { repositories && <GithubButton onClick = { async () => {
            await actions.openModal({ modal: "GithubRepos", params: { repos: repositories, organization }, title: 'Repositories' })
            }}>
              Import Issues
          </GithubButton> }
        </div> }
        { tab === 'PROJECTS' && <div>
          { loadingProjects ?
            <ClipLoader
              size={20}
              color={"333333"}
              loading={true}
            /> :
            <List
              items = {projects}
              renderItem = { project =>
              <li>{project.name}</li>
              }
            />
          }

          { repositories && <GithubButton onClick = { async () => {
            await actions.openModal({ modal: "GithubProjects", params: { organization, projects }, title: 'Projects' })
            }}>
              Import Cards
          </GithubButton> }
        </div>}
      </div>
    </div>
  )
}

export default Organization