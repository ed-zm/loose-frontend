import React, { useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { TASKS, CREATE_TASK, ORGANIZATIONS } from './index.graphql'
import { UserContext } from '../../../contexts/User'
import TaskCard from '../../../components/TaskCard'

interface CreateTaskVariables {
  title: string
  description: string
  state: Number
  estimated: Number
  createdBy: any
  organization?: any
}

const Tasks = () => {
  const user = useContext(UserContext)
  const { data } = useQuery(TASKS)
  const { data: orgs } = useQuery(ORGANIZATIONS)
  const [ createTask ] = useMutation(CREATE_TASK)
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ organization, setOrganization ] = useState('')
  const [ estimated, setEstimated ] = useState(0)
  const sortedTasks = data && data.tasks ? data.tasks.sort((a, b) => a.state - b.state) : []
  const onCreateTask = async () => {
    const variables: CreateTaskVariables = {
      title,
      description,
      state: 0,
      estimated,
      createdBy: { connect: { id: user.id } },
    }
    if(organization) variables.organization = { connect: { id: organization }}
    createTask({
      variables: { data: variables },
      optimisticResponse: {
        __typename: "Mutation",
        createTask: {
          __typename: "Task",
          id: "-1",
          title,
          state: 0,
          estimated,
          code: 'AAAA',
          description,
          createdBy: {
            __typename: "User",
            id: user.id
          },
          organization: !organization ? null : {
            __typename: "Organization",
            id: organization
          },
          createdAt: new Date().toISOString()
        }
      },
      update: (proxy, { data: { createTask }}) => {
        const data = proxy.readQuery({ query: TASKS })
        //@ts-ignore
        const newTasks = sortedTasks.slice()
        newTasks.push(createTask)
        proxy.writeQuery({ query: TASKS, data: { tasks: newTasks } })
      }
    })
  }
  return(
    <div>
      <div>
        <input type = 'text' placeholder = 'title' value = {title} onChange = { e => setTitle(e.target.value) }/>
        <input type = 'number' placeholder = 'estimated' value = {estimated} onChange = { e => setEstimated(parseInt(e.target.value, 10)) }/>
        <input type = 'textarea' placeholder = 'description' value = {description} onChange = { e => setDescription(e.target.value) }/>
        <select onChange = {e => setOrganization(e.target.value)} value = {organization}>
          <option key = 'personal-task-select' value = {''}>Personal</option>
          { orgs &&
            orgs.organizations &&
            orgs.organizations.map(o =>
              <option key = {o.id} value = {o.id}>{o.name}</option>
          )}
        </select>
        <button onClick = { onCreateTask }>Create Task</button>
      </div>
      <div>
        {sortedTasks.map(task =>
          <TaskCard task = { task } />
        )}
      </div>
    </div>
  )
}

export default Tasks