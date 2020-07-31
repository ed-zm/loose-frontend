import React, { useContext } from "react";
import OrganizationsList from "../../../components/Lists/Organizations";
import "./index.scss";

const Organizations = () => {
  return (
    <div className="organizations">
      <OrganizationsList />
    </div>
  );
};

export default Organizations;
