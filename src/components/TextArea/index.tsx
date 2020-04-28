import React from 'react'
import './index.scss'

const TextArea = ({ className, rows = 5, ...props}) => {
  return(
    <textarea className = {`textarea ${className}`} rows = { rows } { ...props } />
  )
}

export default TextArea