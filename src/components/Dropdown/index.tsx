import React from 'react'

const Dropdown = ({ children, items = [] }) => {
  return(
    <div>
      <details className="dropdown details-reset details-overlay d-inline-block">
        <summary className="Header-link" aria-haspopup="true">
          { children }
          <div className="dropdown-caret" />
        </summary>

        <ul className="dropdown-menu dropdown-menu-se">
          <li><a className="dropdown-item" href="#url">Dropdown item</a></li>
          <li><a className="dropdown-item" href="#url">Dropdown item</a></li>
          <li><a className="dropdown-item" href="#url">Dropdown item</a></li>
        </ul>
      </details>
    </div>
  )
}

export default Dropdown