import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";


const Button = ({ text, submitting, onClick }) => {
  if(submitting) return <ClipLoader
    size={20}
    color={"333333"}
    loading={true}
  />
  return(
    <button onClick = { onClick } disabled = { submitting }>
      { text }
    </button>
  )
}

export default Button