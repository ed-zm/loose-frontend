import React, { useContext } from "react";
import OrganizationsList from "../../../components/Lists/Organizations";
import "./index.scss";

const Organizations = ({ env }) => {
  return (
    <div className="organizations">
      <OrganizationsList env={env} />
    </div>
  );
};

export default Organizations;
