import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { USERS, ASSIGN_TASK, UNASSIGN_TASK } from './index.graphql'

const Assign = ({ task }) => {
  const [ assignTo, setAssignTo ] = useState('')
  const variables: { assignedToId?: String } = {}
  if(task.assignedTo) variables.assignedToId = task.assignedTo.id
  const { data, refetch: refetchUsers } = useQuery(USERS, { variables })
  const [ assignTask, { loading: assigningTask }] = useMutation(ASSIGN_TASK)
  const [ unassignTask, { loading: unassigningTask }] = useMutation(UNASSIGN_TASK)
  useEffect(() => {
    if(data && !!data.users.length) setAssignTo(data.users[0].id)
  }, [data])
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
          onClick = {async () => {
            await assignTask({
              variables: {
                id: task.id,
                userId: assignTo
              }
            })
            await setAssignTo('')
            await refetchUsers({
              fetchPolicy: 'cache-and-network'
            })
          }}
          disabled = { assigningTask }
        >
          Assign
        </button>
      </div>
    </div>
  )
}

export default Assign