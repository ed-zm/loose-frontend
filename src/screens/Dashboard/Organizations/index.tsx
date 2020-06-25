import React from "react";
import OrganizationCard from "../../../components/OrganizationCard";
import useOrganizations from "loose-components/src/screens/Dashboard/Organizations";
import "./index.scss";

const Organizations = () => {
  const { organizations } = useOrganizations();
  return (
    <div className="organizations">
      <ul className="Box">
        <li className="organizations-list-item Box-header">
          <h3 className="Box-title">Filters</h3>
        </li>
        {organizations.map((organization) => (
          <li className="organizations-list-item Box-body">
            <OrganizationCard organization={organization} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Organizations;
