import React from "react";
import classNames from "classnames";
import OrganizationCard from "../../../components/OrganizationCard";
import useOrganizations from "loose-components/src/screens/Dashboard/Organizations";
import List from "../../../components/List";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./index.scss";

const Organizations = () => {
  const { onCreateOrganization, name, setName, organizations } = useOrganizations();
  return (
    <div className="organizations">
      {false && (
       
      )}
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
