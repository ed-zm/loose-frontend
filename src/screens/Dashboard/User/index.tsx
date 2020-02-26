import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { USER } from './index.graphql'

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const { data } = useQuery(USER, { variables: { id } })
  return(
    <div>
        {data && data.user &&
          <div>
            <div>{ data.user.email }</div>
            <div>{ data.user.username }</div>
            <div>{ data.user.firstName }</div>
            <div>{ data.user.lastName }</div>
          </div>
        }
    </div>
  )
}

export default User