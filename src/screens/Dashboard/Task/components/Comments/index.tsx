import React, { useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import { UserContext } from 'loose-components/src/contexts/User'
import { COMMENTS, CREATE_COMMENT } from './index.graphql'


const Comments = ({ task }) => {
  const user = useContext(UserContext)
  const [ comment, setComment ] = useState('')
  const [ mentions, setMentions ] = useState([])
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
      <input
        type = 'textarea'
        value = {comment}
        onChange = { async e => {
          const value = e.target.value
          const found = value.match(/([@][\w_-]+)/gi)
          if(found) {
            await setMentions(found)
          }
          await setComment(value)
        }}
      />
      <button 
        onClick = { async () => {
          await createComment({
            variables: {
              userId: user.id,
              taskId: task.id,
              text: comment,
              mentions: mentions.map(value => {
                const mention = value.split('@')[1]
                const title = `respond to ${mention} in ${task.code}`
                return {
                  title,
                  description: `Response Request in ${title} from ${mention}`,
                  createdBy: {
                    connect: { id: user.id }
                  },
                  assignedTo: {
                    connect: { username: mention }
                  }
                }
              })
            },
            optimisticResponse: {
              __typename: "Mutation",
              updateTask: {
                __typename: "Task",
                id: task.id,
                comments: [{
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
                }]
              }
            },
            update: (proxy, { data: { updateTask } }) => {
              const proxyData: any = proxy.readQuery({ query: COMMENTS, variables: { taskId: task.id } })
              const newComments = proxyData.comments.slice()
              newComments.push(updateTask.comments[updateTask.comments.length - 1])
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