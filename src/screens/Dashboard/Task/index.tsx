import React from 'react'
import { useRouter } from 'next/router'
import Markdown from 'react-markdown'
import moment from 'moment'
import Assign from './components/Assign'
import Labels from './components/Labels'
import Comments from './components/Comments'
import useTask from 'loose-components/src/screens/Dashboard/Task'

const Task = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data,
    loading,
    error,
    isMember
  } = useTask({ id })
  return(
    <div>
      { data && data.task &&
        <div>
          <div>
            <img src = '/copy.png' onClick = { async () => {
            if(navigator && navigator.clipboard) {
              await navigator.clipboard.writeText(data.task.code)
              alert('copied to clipboard')
            }
          }} />
          <span>{data.task.code}</span>
          </div>
          <div>{data.task.title}</div>
          <Markdown className = '' source = {data.task.description} />
          { isMember && <div>
            {data.task.assignedTo ?
              <div>
                Assigned To: {data.task.assignedTo.firstName} {data.task.assignedTo.lastName}
              </div> :
              <div>UNASSIGNED</div>
            }
          </div>}
          <div>{moment(data.task.createdAt).format('DD/MMM/YYYY HH:mm')}</div>
          { isMember && <Assign task = { data.task } />}
          <Labels task = { data.task } />
          <Comments task = { data.task } />
        </div>
      }
    </div>
  )
}

export default Task