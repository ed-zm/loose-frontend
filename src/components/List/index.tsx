import React from 'react'
import './index.scss'

const List = ({ items = [], renderItem }) => {
  return(
    <ul className = 'list'>
      {!!items.length ?
        items.map(item =>
          <li className = 'list-item'>{renderItem(item)}</li>
        ) : 
        <span className = 'list-no-items-text'> No Items Available </span>
      }
    </ul>
  ) 
}

export default List