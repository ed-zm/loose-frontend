import React, { useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import { UserContext } from '../../../../../contexts/User'
import { COMMENTS, CREATE_COMMENT } from './index.graphql'


const Comments = ({ task }) => {
  const user = useContext(UserContext)
  const [ comment, setComment ] = useState('')
  const { data } = useQuery(COMMENTS, { variables: { taskId: task.id } })
  const [ createComment, { loading: creatingComment }] = useMutation(CREATE_COMMENT)
  return(
    <div>
      { data && data.comments && data.comments.map(({ id, user: { firstName, lastName }, text, createdAt }) => 
        <div key = {id}>
          <div>{firstName} {lastName}</div>
          <div>{text}</div>
          <div>{moment(createdAt).format('DD MMM YYYY HH:mm:ss')}</div>
        </div>
      )}
      <input type = 'textarea' value = {comment} onChange = { e => setComment(e.target.value)} />
      <button 
        onClick = { async () => {
          await createComment({
            variables: {
              userId: user.id,
              taskId: task.id,
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
                  id: task.id
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
              const proxyData: any = proxy.readQuery({ query: COMMENTS, variables: { taskId: task.id } })
              const newComments = proxyData.comments.slice()
              newComments.push(createComment)
              proxy.writeQuery({ query: COMMENTS, variables: { taskId: task.id }, data: { comments: newComments } })
            }
          })
          await setComment('')
        }}
        disabled = { creatingComment }
      >
        comment
      </button>
    </div>
  )
}

export default Comments