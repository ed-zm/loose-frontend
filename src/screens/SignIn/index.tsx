import React from 'react'
import Cookies from 'js-cookie'
import router from 'next/router'
import ClipLoader from "react-spinners/ClipLoader";
import useSignIn from 'loose-components/src/screens/SignIn'

const SignIn = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    onSignIn,
    signingIn,
    error
  } = useSignIn({
    callback: async () => await router.push('/dashboard'),
    setToken: token => Cookies.set('token', token)
  })
  return(
    <div>
      <div>
        {error && <span>
          {error.toString()}
        </span>}
      </div>
      <div>
        <input value = {email} placeholder = 'email' onChange = {e => setEmail(e.target.value) } />
        <input
          value = {password}
          placeholder = 'password'
          type = 'password'
          onChange = {e => setPassword(e.target.value) }
          onKeyPress = {e => {
            if(e.key === 'Enter') onSignIn()
          }}
        />
        { !signingIn ?
          <button onClick = {onSignIn} disabled = {signingIn}>
            Sign In
          </button> :
          <ClipLoader
            size={20}
            color={"333333"}
            loading={true}
          />
        }
      </div>
    </div>
  )
}

export default SignIn