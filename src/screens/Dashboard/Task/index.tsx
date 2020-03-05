import React from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import { TASK } from './index.graphql'

const Task = () => {
  const router = useRouter()
  const { id } = router.query
  const where = id.length > 6 ? { id } : { code: id } 
  const { data } = useQuery(TASK, { variables: { where } })
  return(
    <div>
      { data && data.task &&
        <div>
          <div>{data.task.title}</div>
          <div>{data.task.description}</div>
          <div>{moment(data.task.createdAt).format('DD/MMM/YYYY HH:mm')}</div>
          <div></div>
        </div>
      }
    </div>
  )
}

export default Task