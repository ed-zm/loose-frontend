import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import './index.scss'

const Button = ({ text, submitting, onClick }) => {
  if(submitting) return <ClipLoader
    size={20}
    color={"333333"}
    loading={true}
  />
  return(
    <button onClick = { onClick } disabled = { submitting } className = 'button-container'>
      { text }
    </button>
  )
}

export default Button