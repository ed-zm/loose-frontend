import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { UserContext } from '../../../contexts/User'
import { TASK, USERS, TASK_COMMENTS, CREATE_COMMENT, ASSIGN_TASK, UNASSIGN_TASK, LABELS, ADD_LABEL } from './index.graphql'

const Task = () => {
  const router = useRouter()
  const user = useContext(UserContext)
  const [ assignTo, setAssignTo ] = useState('')
  const [ comment, setComment ] = useState('')
  const [ label, setLabel ] = useState('')
  const { id } = router.query
  const where = id.length > 6 ? { id } : { code: id } 
  const { data } = useQuery(TASK, { variables: { where } })
  const [ assignTask, { loading: assigningTask }] = useMutation(ASSIGN_TASK)
  const [ unassignTask, { loading: unassigningTask }] = useMutation(UNASSIGN_TASK)
  const [fetchUsers, { data: usersData, refetch: refetchUsers }] = useLazyQuery(USERS)
  const [fetchComments, { data: commentsData }] = useLazyQuery(TASK_COMMENTS)
  const [fetchLabels, { data: labelsData }] = useLazyQuery(LABELS)
  const [ addLabel, { loading: creatingLabel }] = useMutation(ADD_LABEL)
  const [ createComment, { loading: creatingComment }] = useMutation(CREATE_COMMENT)
  useEffect(() => {
    const promises = [
      fetchComments({ variables: { taskId: data.task.id } }),
      fetchLabels({ variables: { taskId: data.task.id } })
    ]
    if(data && data.task && data.task.assignedTo) {
      promises.push(fetchUsers({ variables: { assignedToId: data.task.assignedTo.id }}))
    }
    Promise.all(promises)
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
              { labelsData && labelsData.labels && labelsData.labels.map(label =>
                <div key = {label.id}>{ label.text } </div>
              )}
            </div>
            <input type = 'text' value = {label} onChange = { e => setLabel(e.target.value)} />
            <button onClick = { async () => {
              await addLabel({
                variables: { taskId: data.task.id, text: label },
                optimisticResponse: {
                  __typename: "Mutation",
                  createLabel: {
                    __typename: "Label",
                    id: -1,
                    color: "green",
                    text: label
                  }
                },
                update: (proxy, { data: { createLabel } }) => {
                  const proxyData: any = proxy.readQuery({ query: LABELS, variables: { taskId: data.task.id } })
                  const newLabels = proxyData.labels.slice()
                  const labelExists = newLabels.find(label => label.text === createLabel.text )
                  if(!labelExists) {
                    newLabels.push(createLabel)
                    proxy.writeQuery({ query: LABELS, variables: { taskId: data.task.id }, data: { labels: newLabels } })
                  }
                }
              })
              await setLabel('')
            }}>
              add label
            </button>
          </div>
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
          <div>
            { commentsData && commentsData.comments && commentsData.comments.map(({ id, user: { firstName, lastName }, text, createdAt }) => 
              <div key = {id}>
                <div>{firstName} {lastName}</div>
                <div>{text}</div>
                <div>{moment(createdAt).format('DD MMM YYYY HH:mm:ss')}</div>
              </div>
            )}
            <input type = 'textarea' value = {comment} onChange = { e => setComment(e.target.value)} />
            <button onClick = { async () => {
              await createComment({
                variables: {
                  userId: user.id,
                  taskId: data.task.id,
                  text: comment
                },
                optimisticResponse: {
                  __typename: "Mutation",
                  createComment: {
                    __typename: "Comment",
                    id: -1,
                    text: comment,
                    task: {
                      __typename: "Task",
                      id: data.task.id
                    },
                    user: {
                      __typename: "User",
                      id: user.id,
                      firstName: user.firstName,
                      lastName: user.lastName
                    },
                    createdAt: moment()
                  }
                },
                update: (proxy, { data: { createComment } }) => {
                  const proxyData: any = proxy.readQuery({ query: TASK_COMMENTS, variables: { taskId: data.task.id } })
                  const newComments = proxyData.comments.slice()
                  newComments.push(createComment)
                  proxy.writeQuery({ query: TASK_COMMENTS, variables: { taskId: data.task.id }, data: { comments: newComments } })
                }
              })
              await setComment('')
            }}>comment</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Task