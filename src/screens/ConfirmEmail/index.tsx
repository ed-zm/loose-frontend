import React from 'react'
import { useRouter } from 'next/router'
import useConfirmEmail from 'loose-components/src/screens/ConfirmEmail'

const ConfirmEmail = () => {
  const router = useRouter()
  const { code } = router.query
  const {
    data,
    error,
    loading
  } = useConfirmEmail({code})
  return(
    <div>
      { data && data.confirmEmail ?
        <div> Your email was confirmed </div> :
        <div>
          { loading && <div> loading </div> }
          { error && <div> There is a problem confirming your email </div> }
        </div>
      }
    </div>
  )
}

export default ConfirmEmail