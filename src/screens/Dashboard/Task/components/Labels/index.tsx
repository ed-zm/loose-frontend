import React, { useState } from 'react'
import { LABELS, ADD_LABEL } from './index.graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'

const Labels = ({ task }) => {
  const [ label, setLabel ] = useState('')
  const { data } = useQuery(LABELS, { variables: { taskId: task.id }})
  const [ addLabel, { loading: creatingLabel }] = useMutation(ADD_LABEL)
  return(
    <div>
      <div>
        { data && data.labels && data.labels.map(label =>
          <div key = {label.id}>{ label.text } </div>
        )}
      </div>
      <input type = 'text' value = {label} onChange = { e => setLabel(e.target.value)} />
      <button
        onClick = { async () => {
          await addLabel({
            variables: { taskId: task.id, text: label },
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
              const proxyData: any = proxy.readQuery({ query: LABELS, variables: { taskId: task.id } })
              const newLabels = proxyData.labels.slice()
              const labelExists = newLabels.find(label => label.text === createLabel.text )
              if(!labelExists) {
                newLabels.push(createLabel)
                proxy.writeQuery({ query: LABELS, variables: { taskId: task.id }, data: { labels: newLabels } })
              }
            }
          })
          await setLabel('')
        }}
        disabled = { creatingLabel }
      >
        add label
      </button>
    </div>
  )
}

export default Labels