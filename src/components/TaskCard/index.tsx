import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Markdown from 'react-markdown'
import Link from 'next/link'
import moment from 'moment'
import { UPDATE_TASK } from './index.graphql'
import './index.scss'

const TaskCard = ({ task }) => {
  const [ showDescription, setShowDescription ] = useState(false)
  const [ updateTask ] = useMutation(UPDATE_TASK)
  return(
    <div className = 'task-card-container' style = {{ backgroundColor: task.state === 0? 'transparent' : 'lightgray' }}>
      <div className = 'task-card-id'>
        <input
          type = 'checkbox'
          checked = {task.state === 1 ? true : false }
          onChange = { () => {
            const state = task.state === 0 ? 1 : 0
            updateTask({
              variables: {
                id: task.id,
                state
              },
              optimisticResponse: {
                __typename: "Mutation",
                updateTask: {
                  __typename: "Task",
                  id: task.id,
                  state
                }
              }
            })
          }}/>
        <Link href = '/dashboard/task/[id]' as = {`/dashboard/task/${task.code}`}>
          <a className = 'task-card-id-link'>
            {`${' '}${task.code}`}
          </a>
        </Link>
      </div>
      <div className = 'task-card-content'>
        <span
        className = 'task-card-title'
          onClick = { () => setShowDescription(!showDescription) }
        >
          {task.title}
        </span>
          <div className = 'task-description'>
            { showDescription && <Markdown className = '' source = {task.description} /> }
          </div>
        <span className = 'task-card-date'>{moment(task.createdAt).format('DD/MMM/YYYY HH:mm')}</span>
      </div>
    </div> 
  )
}

export default TaskCard