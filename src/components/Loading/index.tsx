import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./index.scss";

const Loading = (props) => {
  return (
    <div {...props} className="loading">
      <ClipLoader size={70} color={"#24292e"} loading={true} />
    </div>
  );
};

export default Loading;
