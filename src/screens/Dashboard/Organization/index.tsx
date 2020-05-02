import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Button from '../../../components/Button'
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
  mutation($code: String!) {
    githubLogin(code: $code)
  }
`

const Organization = () => {
  const router = useRouter()
  const [ token, setToken ] = useState('')
  const [ repos, setRepos ] = useState([])
  const [ githubLogin, { data: github }] = useMutation(GITHUB_LOGIN)
  const { id } = router.query
  const {
    data
  } = useOrganization({ id })
  const onSuccess = async ({ code }) => {
    if(code) {
      await githubLogin({ variables: { code }})
    }
  }
  useEffect(() => {
    if(github && github.githubLogin) {
      setToken(github.githubLogin)
    }
  }, [github])

  useEffect(() => {
    new Promise(async resolve => {
      const response = await axios.get(
        // 'https://api.github.com/repos/ed-zm/au_test/issues',
        'https://api.github.com/user/repos',
        {
          headers: {
            Authorization: `token ${token}`
          }
        }
      )
      if(response && response.status === 200) {
        // setRepos(response.data)
        actions.openModal({ modal: "GithubRepos", params: { repos: response.data }, title: 'Import Issues from Github' })
      }
      resolve()
    })
  }, [token])
  const { actions } = useContext(ModalContext);
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
          <GithubButton>
            LOGIN
          </GithubButton>
        </GithubLogin>
        <div>Teams</div>
        <div>Users</div>
      </div>
      <div className = 'organization-content'>
        <List
          items = {repos}
          renderItem = { repo => <RepositoryCard repo = {repo} />}
        />

        {!!repos.length && false && <Button onClick = { async () => {
          await actions.openModal({ modal: "GithubRepos", params: { repos }, title: 'Import Issues from Github' })
        }}>
          Import Issues
        </Button>}
      </div>
      </div>
  )
}

export default Organization