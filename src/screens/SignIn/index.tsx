import React from 'react'
import Cookies from 'js-cookie'
import router from 'next/router'
import useSignIn from 'loose-components/src/screens/SignIn'

const SignIn = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    onSignIn
  } = useSignIn({
    callback: async () => await router.push('/dashboard'),
    setToken: token => Cookies.set('token', token)
  })
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