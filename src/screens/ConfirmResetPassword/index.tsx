import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import { CONFIRM_RESET_PASSWORD } from './index.graphql'

const ConfirmResetPassword = () => {
  const router = useRouter()
  const { code } = router.query
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ confirmResetPassword, { data } ] = useMutation(CONFIRM_RESET_PASSWORD)
  const checkPasswords = password !== confirmPassword
  return(
    <div>
      { data && data.confirmResetPassword ?
        <div> Your password was reseted succesfully </div> :
        <div>
          <input type = 'password' placeholder = 'Introduce Password' value = {password} onChange = {e => setPassword(e.target.value)} />
          <input type = 'password' placeholder = 'Confirm Password' value = {confirmPassword} onChange = {e => setConfirmPassword(e.target.value)} />
          <div>
            { checkPasswords && `Password Doesn't match` }
          </div>
          <button onClick = { () => {
            confirmResetPassword({
              variables: { password, resetPasswordCode: code }
            })
          }}
            disabled = {checkPasswords}
          >
            Reset Password
          </button>
        </div>
      }
    </div>
  )
}

export default ConfirmResetPassword