import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_UP } from './index.graphql'
import router from 'next/router';

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [signUpMutation, { data }] = useMutation(SIGN_UP)
  const onSignUp = async () => {
    const signedUp = await signUpMutation({
      variables: {
        email,
        password,
        firstName,
        lastName,
        username
      }
    })
    if(signedUp) {
      router.push('/sign-in')
    }
  }
  return(
    <div>
      <input value = {firstName} placeholder = 'firstName' onChange = {e => setFirstName(e.target.value) } />
      <input value = {lastName} placeholder = 'lastName' onChange = {e => setLastName(e.target.value) } />
      <input value = {username} placeholder = 'username' onChange = {e => setUsername(e.target.value) } />
      <input value = {email} placeholder = 'email' onChange = {e => setEmail(e.target.value) } />
      <input value = {password} placeholder = 'password' type = 'password' onChange = {e => setPassword(e.target.value) } />
      <button onClick = {onSignUp}>
        Sign Up
      </button>
    </div>
  )
}

export default SignUp