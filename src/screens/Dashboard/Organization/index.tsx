import React from 'react'
import { useRouter } from 'next/router'
import useOrganization from 'loose-components/src/screens/Dashboard/Organization'

const Organization = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data
  } = useOrganization({ id })
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