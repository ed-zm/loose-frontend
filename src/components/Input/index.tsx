import React from "react";
import "./index.scss";

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={`form-control input ${className}`} {...props} />;
};
export default Input;
