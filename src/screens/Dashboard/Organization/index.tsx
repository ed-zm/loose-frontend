import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import useOrganization from 'loose-components/src/screens/Dashboard/Organization'
import GithubLogin from 'react-github-login'
import { useMutation } from '@apollo/react-hooks'
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

const Organization = () => {
  const router = useRouter()
  const { actions } = useContext(ModalContext);
  const [ token, setToken ] = useState('')
  const [ repos, setRepos ] = useState([])
  const [ githubLogin, { data: github }] = useMutation(GITHUB_LOGIN)
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
    if(token || (data && data.organization && data.organization.githubToken )) {
      const githubToken = data.organization.githubToken || token
      new Promise(async resolve => {
        const response = await axios.get(
          'https://api.github.com/user/repos',
          {
            headers: {
              Authorization: `token ${githubToken}`
            }
          }
        )
        if(response && response.status === 200) {
          setRepos(response.data)
          // actions.openModal({ modal: "GithubRepos", params: { repos: response.data }, title: 'Import Issues from Github' })
        }
        resolve()
      })
    }
  }, [token, data])
  console.log(repos)
  if(!data) return null
  return(
    <div className = 'organization'>
      <div className = 'organization-profile'>
        <img src = '/default_profile.png' className = 'organization-profile-avatar'/>
        <span className = 'organization-profile-name-text'>{data.organization.name.toUpperCase()}</span>
        <GithubLogin 
          clientId = {process.env.GITHUB_CLIENT_ID}
          onSuccess = { onSuccess}
          onError = { console.log }
          redirectUri = { `http://localhost:3000/oauth` }
          scope = 'repo user:email'
        >
          <GithubButton disabled = {data.organization.githubToken}>
            { data.organization.githubToken ? 'Connected' : 'Connect' }
          </GithubButton>
        </GithubLogin>
        <div>Teams</div>
        <div>Users</div>
      </div>
      <div className = 'organization-content'>
        <List
          items = {repos}
          renderItem = { repo => <RepositoryCard repo = {repo} importButton organization = {data.organization} />}
        />

        {!!repos.length && <GithubButton onClick = { async () => {
          await actions.openModal({ modal: "GithubRepos", params: { repos }, title: 'Repositories' })
        }}>
          Import Issues
        </GithubButton>}
      </div>
      </div>
  )
}

export default Organization