import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import { UPDATE_TASK } from './index.graphql'

const TaskCard = ({ task }) => {
  const [ showDescription, setShowDescription ] = useState(false)
  const [ updateTask ] = useMutation(UPDATE_TASK)
  return(
    <div style = {{ backgroundColor: task.state === 0? 'transparent' : 'lightgray' }}>
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
      <div onClick = { () => setShowDescription(!showDescription) }>{task.title}</div>
      { showDescription && <div>{task.description}</div>}
      <div>{moment(task.createdAt).format('DD/MMM/YYYY HH:mm')}</div>
    </div> 
  )
}

export default TaskCard