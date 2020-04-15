import React from 'react'
import router from 'next/router'
import useSignUp from 'loose-components/src/screens/SignUp'

const SignUp = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    onSignUp
  } = useSignUp({
    callback: () => router.push('/sign-in')
  })
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