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
    onSignUp,
    data
  } = useSignUp({
    callback: () => null // router.push('/sign-in')
  })
  return(
    <div>
      <div>
        {data && <span>
          Account created successfully, please log in to continue
        </span>}
      </div>
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
    </div>
  )
}

export default SignUp