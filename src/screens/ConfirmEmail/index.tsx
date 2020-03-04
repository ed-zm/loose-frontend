import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import { CONFIRM_EMAIL } from './index.graphql'

const ConfirmEmail = () => {
  const router = useRouter()
  const { code } = router.query
  const [ confirmEmail, { data, error, loading } ] = useMutation(CONFIRM_EMAIL)
  useEffect(() => {
    confirmEmail({ variables: {
      emailVerificationCode: code
    }})
  }, [])
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