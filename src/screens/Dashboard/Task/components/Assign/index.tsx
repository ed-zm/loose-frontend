import React from 'react'
import useTaskAssign from 'loose-components/src/screens/Dashboard/Task/components/Assign'

const Assign = ({ task }) => {
  const {
    assignTo,
    setAssignTo,
    data,
    assigningTask,
    onAssignTask
  } = useTaskAssign({ task })
  return(
    <div>
      <div>
        <select onChange = {e => setAssignTo(e.target.value)} value = {assignTo}>
          { data &&
            data.users &&
            data.users.map(m =>
              <option key = {m.id} value = {m.id}>{m.firstName} {m.lastName}</option>
          )}
        </select>
        <button
          onClick = {onAssignTask}
          disabled = { assigningTask }
        >
          Assign
        </button>
      </div>
    </div>
  )
}

export default Assign