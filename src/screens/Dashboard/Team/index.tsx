import React from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import { TEAM } from './index.graphql'

const Team = () => {
  const router = useRouter()
  const { id } = router.query
  const { data } = useQuery(TEAM, { variables: { id }})
  return(
    <div>
      { data && data.team &&
        <div>
          <div>{data.team.name}</div>
          <div>{moment(data.team.createdAt).format('DD/MMM/YYYY HH:mm')}</div>
          <div></div>
        </div>
      }
    </div>
  )
}

export default Team