import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import './index.scss'

const Button = ({ className, children, ...props }) => {
  if(props.disabled) return <ClipLoader
    size={20}
    color={"333333"}
    loading={true}
  />
  return(
    <button className = {`button-container ${className}`} { ...props }>
      { children }
    </button>
  )
}

export default Button