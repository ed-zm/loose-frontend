import React from 'react'
import './index.scss'

const GithubButton = ({ children, className, ...props }) => {
  return(
    <button { ...props } className = {`github-button ${className}`}>
      <img src = '/github-32x32.png' className = 'github-button-image'/>
      {children}
    </button>
  )
}

export default GithubButton