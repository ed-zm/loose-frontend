import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { TASK, USERS, ASSIGN_TASK, UNASSIGN_TASK } from './index.graphql'

const Task = () => {
  const router = useRouter()
  const [ assignTo, setAssignTo ] = useState('')
  const { id } = router.query
  const where = id.length > 6 ? { id } : { code: id } 
  const { data } = useQuery(TASK, { variables: { where } })
  const [ assignTask, { loading: assigningTask }] = useMutation(ASSIGN_TASK)
  const [ unassignTask, { loading: unassigningTask }] = useMutation(UNASSIGN_TASK)
  const [fetchUsers, { data: usersData, refetch: refetchUsers }] = useLazyQuery(USERS)
  useEffect(() => {
    if(data && data.task && data.task.assignedTo) {
      fetchUsers({ variables: { assignedToId: data.task.assignedTo.id }})
    }
  }, [data])
  useEffect(() => {
    if(usersData && !!usersData.users.length) setAssignTo(usersData.users[0].id)
  }, [usersData])
  return(
    <div>
      { data && data.task &&
        <div>
          <div>{data.task.title}</div>
          <div>{data.task.description}</div>
          <div>
            {data.task.assignedTo ?
              <div>
                Assigned To: {data.task.assignedTo.firstName} {data.task.assignedTo.lastName}
              </div> :
              <div>UNASSIGNED</div>
            }
          </div>
          <div>{moment(data.task.createdAt).format('DD/MMM/YYYY HH:mm')}</div>
          <div>
            <div>
              <select onChange = {e => setAssignTo(e.target.value)} value = {assignTo}>
                { usersData &&
                  usersData.users &&
                  usersData.users.map(m =>
                    <option key = {m.id} value = {m.id}>{m.firstName} {m.lastName}</option>
                )}
              </select>
              <button
                onClick = {async () => {
                  await assignTask({
                    variables: {
                      id: data.task.id,
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
        </div>
      }
    </div>
  )
}

export default Task