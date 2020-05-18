import React, { useContext } from 'react'
import useTasks from 'loose-components/src/screens/Dashboard/Tasks'
import TaskCard from '../../../components/TaskCard'
import Button from '../../../components/Button'
import { ModalContext } from 'loose-components/src/contexts/UI/Modal'
import './index.scss'

const Tasks = () => {
  const modal = useContext(ModalContext)
  const {
    sortedTasks
  } = useTasks()
  return(
    <div className = 'Box tasks-container'>
      <Button
        onClick = { () => {
          modal.actions.openModal({ modal: "CreateTask", title: "Add Task", params: { tasks: sortedTasks } })
        }}
      >
        Add Task
      </Button>
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