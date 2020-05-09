import React, { useEffect, useState, useContext } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from 'next/router'
import useOrganization from 'loose-components/src/screens/Dashboard/Organization'
import GithubLogin from 'react-github-login'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import GithubButton from '../../../components/GithubButton'
import List from '../../../components/List'
import RepositoryCard from '../../../components/RepositoryCard'
import gql from 'graphql-tag'
import './index.scss'

const GITHUB_LOGIN = gql`
  mutation($code: String!, $organizationId: ID!) {
    githubLogin(code: $code, organizationId: $organizationId)
  }
`

const GITHUB_REPOS = gql`
  query($organizationId: ID!) {
    githubRepositories(organizationId: $organizationId) {
      id
      name
      fullName
      private
      updatedAt
      language
      openIssuesCount
      description
      stargazersCount
      forksCount
    }
  }
`

const GITHUB_PROJECTS = gql`
  query($organizationId: ID!) {
    githubProjects(organizationId: $organizationId) {
      id
      name
      fullName
      private
      updatedAt
      language
      openIssuesCount
      description
      stargazersCount
      forksCount
    }
  }
`

const Organization = ({ env }) => {
  const router = useRouter()
  const { actions } = useContext(ModalContext);
  const [ token, setToken ] = useState('')
  const [ githubLogin, { data: github }] = useMutation(GITHUB_LOGIN)
  const [fetchRepos, { data: repos, loading: loadingRepos }] = useLazyQuery(GITHUB_REPOS)
  const { id } = router.query
  const {
    data
  } = useOrganization({ id })
  const onSuccess = async ({ code }) => {
    if(code) {
      await githubLogin({ variables: { code, organizationId: data.organization.id }})
    }
  }
  useEffect(() => {
    if(github && github.githubLogin) {
      setToken(github.githubLogin)
    }
  }, [github])

  useEffect(() => {
    if(data && data.organization) {
      fetchRepos({ variables: {
        organizationId: data.organization.id
      }})
    }
  }, [token, data])
  if(!data) return null
  return(
    <div className = 'organization'>
      <div className = 'organization-profile'>
        <img src = '/default_profile.png' className = 'organization-profile-avatar'/>
        <span className = 'organization-profile-name-text'>{data.organization.name.toUpperCase()}</span>
        <GithubLogin 
          clientId = {env.GITHUB_CLIENT_ID}
          onSuccess = { onSuccess}
          onError = { console.log }
          redirectUri = { `${env.HOST}/oauth` }
          scope = 'repo read:user read:org'
        >
          <GithubButton disabled = {data.organization.githubToken}>
            { data.organization.githubToken ? 'Connected' : 'Connect' }
          </GithubButton>
        </GithubLogin>
        <div>Teams</div>
        <div>Users</div>
      </div>
      <div className = 'organization-content'>
        { loadingRepos ?
          <ClipLoader
            size={20}
            color={"333333"}
            loading={true}
          /> :
          <List
            items = {repos && repos.githubRepositories}
            renderItem = { repo => <RepositoryCard repo = {repo} importButton organization = {data.organization} />}
          />
        }

        { repos && repos.githubRepositories && !!repos.githubRepositories.length && <GithubButton onClick = { async () => {
          await actions.openModal({ modal: "GithubRepos", params: { repos: repos.githubRepositories, organization: data.organization }, title: 'Repositories' })
          }}>
            Import Issues
        </GithubButton> }
      </div>
      </div>
  )
}

export default Organization