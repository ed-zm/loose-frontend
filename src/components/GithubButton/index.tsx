import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./index.scss";

const GithubButton = ({ children, className, ...props }) => {
  if (props.disabled) return <ClipLoader size={20} color={"FFF"} loading={true} />;
  return (
    <button {...props} className={`github-button ${className}`} type="button">
      <img src="/github-32x32.png" className="github-button-image" />
      {children}
    </button>
  );
};

export default GithubButton;
