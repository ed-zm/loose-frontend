import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
// import './index.scss'

const Button = ({ className, children, deleteButton = false, ...props }) => {
  return (
    <button className={`btn btn-${deleteButton ? "danger" : "primary"} ${className}`} type="button" {...props}>
      {deleteButton && (
        <svg
          className="octicon octicon-trashcan"
          viewBox="0 0 12 16"
          version="1.1"
          width="12"
          height="16"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"
          ></path>
        </svg>
      )}
      {props.disabled ? (
        <React.Fragment>
          <span>Loading</span>
          <span className="AnimatedEllipsis" />
        </React.Fragment>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
