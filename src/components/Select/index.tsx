import React from "react";
// import './index.scss'

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  items: any[];
  renderItem: (item: any) => Element;
}

export const Option = ({ className = "", children, ...props }: React.InputHTMLAttributes<HTMLOptionElement>) => {
  return (
    <option {...props} className={`select-option ${className}`}>
      {children}
    </option>
  );
};

const Select = ({ items = [], children, renderItem, className, disabled, ...props }: SelectProps) => {
  return (
    // <div className = {`select-wrapper ${className}`} >
    <select className="form-select" {...props}>
      {children}
      {items.map((item) => renderItem(item))}
    </select>
    // </div>
  );
};

export default Select;
