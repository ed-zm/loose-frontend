import React from 'react'
import useTaskLabels from 'loose-components/src/screens/Dashboard/Task/components/Labels'

const Labels = ({ task }) => {
  const {
    onAddLabel,
    data,
    label,
    setLabel,
    creatingLabel,
    organizationId
  } = useTaskLabels({ task })
  return(
    <div>
      <div>
        { data && data.labels && data.labels.map(label =>
          // Label Name is conformed by ${label}-${organizationId} to make it unique per organization and keep the index in DB
          <div key = {label.id}>{ label.text.split('-')[0] } </div>
        )}
      </div>
      <input type = 'text' value = {label} onChange = { e => setLabel(e.target.value)} />
      { organizationId && <button
        onClick = {onAddLabel}
        disabled = { creatingLabel }
      >
        add label
      </button>}
    </div>
  )
}

export default Labels