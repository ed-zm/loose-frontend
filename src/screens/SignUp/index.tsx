import React from 'react'
import router from 'next/router'
import parseError from 'loose-components/src/utils/parseError'
import Button from '../../components/Button'
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
    data,
    error,
    signingUp
  } = useSignUp({
    callback: () => router.push('/sign-in?accountCreated=true')
  })
  return(
    <div>
      <div>
        {error && <span>{parseError(error)}</span>}
      </div>
      <div>
        <input value = {firstName} placeholder = 'firstName' onChange = {e => setFirstName(e.target.value) } />
        <input value = {lastName} placeholder = 'lastName' onChange = {e => setLastName(e.target.value) } />
        <input value = {username} placeholder = 'username' onChange = {e => setUsername(e.target.value) } />
        <input value = {email} placeholder = 'email' onChange = {e => setEmail(e.target.value) } />
        <input
          value = {password}
          placeholder = 'password'
          type = 'password'
          onChange = {e => setPassword(e.target.value) }
          onKeyPress = {e => {
            if(e.key === 'Enter') onSignUp()
          }}
        />
        <Button text = 'Sign Up' onClick = {onSignUp} submitting = {signingUp} />
      </div>
    </div>
  )
}

export default SignUp