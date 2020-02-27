import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { TASKS, CREATE_TASK, ORGANIZATIONS } from './index.graphql'
import { UserContext } from '../../../contexts/User'

const Tasks = () => {
  const user = useContext(UserContext)
  const { data } = useQuery(TASKS)
  const { data: orgs } = useQuery(ORGANIZATIONS)
  const [ createTask ] = useMutation(CREATE_TASK)
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ organization, setOrganization ] = useState('')
  useEffect( () => {
    if(orgs && orgs.organizations && !!orgs.organizations.length) setOrganization(orgs.organizations[0].id)
  }, [orgs])
  const onCreateTask = async () => {
    createTask({
      variables: {
        title,
        description,
        creatorId: user.id,
        organizationId: organization
      },
      optimisticResponse: {
        __typename: "Mutation",
        createTask: {
          __typename: "Task",
          id: "-1",
          title,
          description,
          createdBy: {
            __typename: "User",
            id: user.id
          },
          organization: {
            __typename: "Organization",
            id: organization
          },
          createdAt: new Date().toISOString()
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
        <select onChange = {e => setOrganization(e.target.value)} value = {organization}>
          { orgs &&
            orgs.organizations &&
            orgs.organizations.map(o =>
              <option key = {o.id} value = {o.id}>{o.name}</option>
          )}
        </select>
        <button onClick = { onCreateTask }>Create Task</button>
      </div>
      <ul>
        {data && data.tasks && data.tasks.map(task =>
          <li key = {task.id}>
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