import React from 'react'
import Cookies from 'js-cookie'
import Button from '../../components/Button'
import useSignIn from 'loose-components/src/screens/SignIn'
import parseError from 'loose-components/src/utils/parseError'
import { useRouter } from 'next/router'
import errors from 'loose-components/src/utils/errors'

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
    <div>
      <div>
        { accountCreated && <span>Account Created Please Log In </span>}
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
        <Button text = 'Sign In' onClick = {onSignIn} submitting = {signingIn} />
      </div>
    </div>
  )
}

export default SignIn