import React from 'react'
import useTasks from 'loose-components/src/screens/Dashboard/Tasks'
import TextAreaMD from '../../../components/TextAreaMD'
import Input from '../../../components/Input'
import TaskCard from '../../../components/TaskCard'
import Button from '../../../components/Button'
import './index.scss'

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
    <div className = 'tasks-container'>
      <div className = 'tasks-create-task'>
        <Input type = 'text' placeholder = 'title' value = {title} onChange = { e => setTitle(e.target.value) }/>
        <Input type = 'number' placeholder = 'estimated' value = {estimated} onChange = { e => setEstimated(parseInt(e.target.value, 10)) }/>
        <TextAreaMD placeholder = 'description' value = {description} onChange = { e => setDescription(e.target.value) }/>
        <select onChange = {e => setOrganization(e.target.value)} value = {organization}>
          <option key = 'personal-task-select' value = {''}>Personal</option>
          { orgs &&
            orgs.organizations &&
            orgs.organizations.map(o =>
              <option key = {o.id} value = {o.id}>{o.name}</option>
          )}
        </select>
        <Button onClick = { onCreateTask }>Create Task</Button>
      </div>
      <div className = 'tasks-cards-container'>
        {sortedTasks.map(task =>
          <div>
            <TaskCard task = { task } />
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks