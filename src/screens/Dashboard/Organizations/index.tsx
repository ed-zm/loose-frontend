import React, { useContext } from "react";
import OrganizationCard from "../../../components/OrganizationCard";
import Button from "../../../components/Button";
import useOrganizations from "loose-components/src/screens/Dashboard/Organizations";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";

const Organizations = () => {
  const { organizations } = useOrganizations();
  const modal = useContext(ModalContext);
  return (
    <div className="organizations">
      <div className="organizations-create-button">
        <Button
          onClick={() => {
            modal.actions.openModal({ modal: "CreateOrganization", title: "Create Organization" });
          }}
        >
          Create Organization
        </Button>
      </div>
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
