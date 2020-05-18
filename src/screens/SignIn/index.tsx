import React from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import Button from '../../components/Button'
import Input from '../../components/Input'
import useSignIn from 'loose-components/src/screens/SignIn'
import parseError from 'loose-components/src/utils/parseError'
import { useRouter } from 'next/router'
import errors from 'loose-components/src/utils/errors'
import './index.scss'

const SignIn = () => {
  const router = useRouter()
  const { accountCreated } = router.query
  const {
    email,
    setEmail,
    password,
    setPassword,
    onSignIn,
    signingIn,
    error,
    onResendVerificationEmail,
    resendingVerificationEmail,
    resendVerificationEmailError,
    resendVerificationEmailSent
  } = useSignIn({
    callback: async () => await router.push('/dashboard'),
    setToken: token => Cookies.set('token', token)
  })
  const parsedError = parseError(error)
  return(
    <div className = 'sign-in-container'>
      {parsedError && <div>
        <span>{parsedError}</span>
        {(parsedError === errors.CONFIRM_EMAIL) &&
          <div>
            { resendVerificationEmailError && <span>{parseError(resendVerificationEmailError)}</span>}
            { resendVerificationEmailSent ?
              <span>{errors.VERIFICATION_EMAIL_SENT}</span> :
            <Button text = 'Resend Verification Email' onClick = {onResendVerificationEmail} submitting = {resendingVerificationEmail} />}
          </div>
        }
      </div>}
      <div className = 'auth-form-body'>
        {/* <span className = 'sign-in-title'>Sign In</span> */}
        <label for = 'email-field'>
          Email Address
        </label>
        <Input
          id = 'email-field'
          className = 'input-block'
          value = {email}
          placeholder = 'email'
          onChange = {e => setEmail(e.target.value) }
        />
        <label for = 'password-field'>
          Password
          <Link href = '/reset-password'>
            <a className = 'label-link'>Forgot Password?</a>
          </Link>
        </label>
        <Input
          id = 'password-field'
          className = 'input-block'
          value = {password}
          placeholder = 'password'
          type = 'password'
          onChange = {e => setPassword(e.target.value) }
          onKeyPress = {e => {
            if(e.key === 'Enter') onSignIn()
          }}
        />
        <Button onClick = {onSignIn} disabled = {signingIn}>
          Sign In
        </Button>
        </div>
    </div>
  )
}

export default SignIn