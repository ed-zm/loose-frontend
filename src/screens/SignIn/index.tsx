import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import router from 'next/router'
import { SIGN_IN } from './index.graphql'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInMutation, { data }] = useMutation(SIGN_IN)
  const onSignIn = async () => {
    const token = await signInMutation({
      variables: {
        email,
        password
      }
    })
    if(token) {
      router.push('/dashboard/tasks')
    } else {
      throw new Error('Invalid Credentials')
    }
  }
  return(
    <div>
      <input value = {email} placeholder = 'email' onChange = {e => setEmail(e.target.value) } />
      <input value = {password} placeholder = 'password' type = 'password' onChange = {e => setPassword(e.target.value) } />
      <button onClick = {onSignIn}>
        Sign In
      </button>
    </div>
  )
}

export default SignIn