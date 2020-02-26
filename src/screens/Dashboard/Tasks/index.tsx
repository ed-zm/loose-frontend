import React, { useState } from 'react'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { TASKS, CREATE_TASK } from './index.graphql'

const Tasks = () => {
  const { data } = useQuery(TASKS)
  const [ createTask ] = useMutation(CREATE_TASK)
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')

  const onCreateTask = async () => {
    createTask({
      variables: {},
      optimisticResponse: {
        __typename: "Mutation",
        createTask: {
          id: "-1"
        }
      },
      update: (proxy, { data: { createTask }}) => {
        const data = proxy.readQuery({ query: TASKS })
        //@ts-ignore
        const newTasks = data.tasks.slice()
        newTasks.push(createTask)
        proxy.writeQuery({ query: TASKS, data: { tasks: newTasks } })
      }
    })
  }
  return(
    <div>
      <div>
        <input type = 'text' placeholder = 'title' value = {title} onChange = { e => setTitle(e.target.value) }/>
        <input type = 'textarea' placeholder = 'description' value = {description} onChange = { e => setDescription(e.target.value) }/>
        <button onClick = { onCreateTask }>Create Task</button>
      </div>
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