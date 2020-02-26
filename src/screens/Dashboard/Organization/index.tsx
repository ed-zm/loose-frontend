import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { ORGANIZATION } from './index.graphql'

const Organization = () => {
  const router = useRouter()
  const { id } = router.query
  const { data } = useQuery(ORGANIZATION, { variables: { id } })
  return(
    <div>
      <ul>
        {data && data.organization &&
          <div>{data.organization.name}</div> 
        }
      </ul>
    </div>
  )
}

export default Organization