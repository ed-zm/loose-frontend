import React from 'react'
import useTasks from 'loose-components/src/screens/Dashboard/Tasks'
import TaskCard from '../../../components/TaskCard'

const Tasks = () => {
  const {
    title,
    setTitle,
    estimated,
    setEstimated,
    description,
    setDescription,
    organization,
    setOrganization,
    orgs,
    onCreateTask,
    sortedTasks
  } = useTasks()
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