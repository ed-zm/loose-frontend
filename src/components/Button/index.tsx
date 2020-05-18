import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
// import './index.scss'

const Button = ({ className, children, ...props }) => {
  return(
    <button className = {`btn btn-primary ${className}`} type = 'button' { ...props }>
      { props.disabled ?
        <React.Fragment>
          <span>Loading</span>
          <span className="AnimatedEllipsis" />
        </React.Fragment> :
        children
      }
    </button>
  )
}

export default Button