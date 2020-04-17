import React from 'react'
import { useRouter } from 'next/router'
import useConfirmResetPassword from 'loose-components/src/screens/ConfirmResetPassword'

const ConfirmResetPassword = () => {
  const router = useRouter()
  const { code } = router.query
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    data,
    checkPasswords,
    onConfirmPassword
  } = useConfirmResetPassword({ code })
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
          <button onClick = {onConfirmPassword}
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