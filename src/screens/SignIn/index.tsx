import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_IN } from './index.graphql'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInMutation, { data }] = useMutation(SIGN_IN)
  return(
    <div>
      <input value = {email} placeholder = 'email' onChange = {e => setEmail(e.target.value) } />
      <input value = {password} placeholder = 'password' onChange = {e => setPassword(e.target.value) } />
      <button onClick = {() => {
        if(email && password) {
          signInMutation({
            variables: {
              email,
              password
            }
          })
        } else {
          throw new Error("Invalid Credentials")
        }
      }}>
        Sign In
      </button>
    </div>
  )
}

export default SignIn