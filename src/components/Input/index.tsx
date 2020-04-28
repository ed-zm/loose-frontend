import React from 'react'
import './index.scss'

const Input = ({ className, ...props }) => {
  return(
    <input className = {`input ${className}`} {...props } />
  )
}
export default Input