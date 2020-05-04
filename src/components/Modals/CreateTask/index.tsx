import React from 'react'
import TextAreaMD from '../../TextAreaMD'
import Input from '../../Input'
import Button from '../../Button'
import Select, { Option } from '../../Select'
import useCreateTask from 'loose-components/src/components/Modals/CreateTask'
import './index.scss'

const CreateTask = ({ tasks, closeModal }) => {
  const {
    orgs,
    onCreateTask,
    title,
    setTitle,
    estimated,
    setEstimated,
    description,
    setDescription,
    organization,
    setOrganization,
    creatingTask
  } = useCreateTask({ tasks, callback: closeModal })
  return(
  <div className = 'tasks-create-task'>
      <Input type = 'text' placeholder = 'title' value = {title} onChange = { e => setTitle(e.target.value) }/>
      <Input type = 'number' placeholder = 'estimated' value = {estimated} onChange = { e => setEstimated(parseInt(e.target.value, 10)) }/>
      <TextAreaMD placeholder = 'description' value = {description} onChange = { e =>  setDescription(e.target.value) }/>
      <Select
        onChange = {e => setOrganization(e.target.value)}
        value = {organization}
        items = { orgs && orgs.organizations && orgs.organizations }
        renderItem = { org => <Option key = {org.id} value = {org.id}>{org.name}</Option> }
      >
        <Option key = 'personal-task-select' value = {''}>Personal</Option>
      </Select>
      {/* <select onChange = {e => setOrganization(e.target.value)} value = {organization}>
        <option key = 'personal-task-select' value = {''}>Personal</option>
        { orgs &&
          orgs.organizations &&
          orgs.organizations.map(o =>
            <option key = {o.id} value = {o.id}>{o.name}</option>
        )}
      </select> */}
      <Button onClick = { onCreateTask } disabled = { creatingTask }>Create Task</Button>
    </div>
  )
}

export default CreateTask