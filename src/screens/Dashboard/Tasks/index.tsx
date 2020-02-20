import React from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import { TASKS } from './index.graphql'

const Tasks = () => {
  const { data } = useQuery(TASKS)
  return(
    <div>
      <ul>
        {data && data.tasks && data.tasks.map(task =>
          <li>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{moment(task.createdAt).format('DD/MMM/YYYY HH:mm')}</div>
          </li>  
        )}
      </ul>
    </div>
  )
}

export default Tasks