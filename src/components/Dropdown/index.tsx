import React from "react";
import "./index.scss";

const Dropdown = ({ children }) => {
  return (
    <div className="dropdown">
      <details className="dropdown details-reset details-overlay d-inline-block">
        <summary className="Header-link" aria-haspopup="true">
          {!!children.length && React.cloneElement(children[0], { onClick: () => {} })}
          &nbsp;
          <div className="dropdown-caret" />
        </summary>

        <ul className="dropdown-menu dropdown-menu-se dropdown-list">
          {React.Children.map(children, (child, i) => (
            <li className="dropdown-list-item">{React.cloneElement(child)}</li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default Dropdown;
