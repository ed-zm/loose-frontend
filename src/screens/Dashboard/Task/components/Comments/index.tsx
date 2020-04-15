import React from 'react'
import moment from 'moment'
import useTaskComments from 'loose-components/src/screens/Dashboard/Task/components/Comments'

const Comments = ({ task }) => {
  const {
    data,
    comment,
    setComment,
    creatingComment,
    onCreateComment,
    setMentions
  } = useTaskComments({ task })
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
        onClick = {onCreateComment}
        disabled = { creatingComment }
      >
        comment
      </button>
    </div>
  )
}

export default Comments