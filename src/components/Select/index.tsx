import React from 'react'
// import './index.scss'

export const Option = ({ className = '', children, ...props }) => {
  return(
    <option { ...props } className = {`select-option ${className}`}>
      {children}
    </option>
  )
}


const Select = ({ items = [], children,renderItem, className, disabled, ...props }) => {
  return(
    // <div className = {`select-wrapper ${className}`} >
      <select className = 'form-select' { ...props }>
        { children }
        {items.map(item =>
          renderItem(item)
        )}
      </select>
    // </div>
  ) 
}

export default Select