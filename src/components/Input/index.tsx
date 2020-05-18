import React from 'react'
// import './index.scss'

const Input = ({ className, ...props }) => {
  return(
    <input className = {`form-control ${className}`} {...props } />
  )
}
export default Input