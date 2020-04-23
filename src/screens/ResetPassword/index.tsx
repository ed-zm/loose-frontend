import React from 'react'
import useResetPassword from 'loose-components/src/screens/ResetPassword'

const ResetPassword = () => {
  const {
    email,
    setEmail,
    data,
    onResetPassword
  } = useResetPassword()
  return(
    <div>
      { data && data.resetPassword ?
        <div> We've sent you an Email With Instructions to reset your password </div> :
        <div>
        <input type = 'text' placeholder = 'Introduce email' value = {email} onChange = {e => setEmail(e.target.value)} />
        <button onClick = {onResetPassword}>
          Reset Password
        </button>
      </div>}
    </div>
  )
}

export default ResetPassword