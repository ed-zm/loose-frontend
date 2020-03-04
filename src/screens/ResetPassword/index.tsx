import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { RESET_PASSWORD } from './index.graphql'

const ResetPassword = () => {
  const [ email, setEmail ] = useState('')
  const [ resetPassword, { data } ] = useMutation(RESET_PASSWORD)
  return(
    <div>
      { data && data.resetPassword ?
        <div> We've sent you an Email With Instructions to reset your password </div> :
        <div>
        <input type = 'text' placeholder = 'Introduce email' value = {email} onChange = {e => setEmail(e.target.value)} />
        <button onClick = { () => {
          resetPassword({ variables: { email } })
        }}>
          Reset Password
        </button>
      </div>}
    </div>
  )
}

export default ResetPassword