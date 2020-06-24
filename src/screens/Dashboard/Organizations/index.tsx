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
        <div>
          <div>
            <input type="text" placeholder="organization name" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={onCreateOrganization}> Create Organization </button>
          </div>
          <div className="js-check-all-container">
            <div className="subnav org-toolbar org-toolbar-next">
              <div className="subnav-search float-left">
                <div className="auto-search-group">
                  <Input className="subnav-search-input input-contrast auto-search-input js-team-search-field" />
                </div>
              </div>
              <div className="float-right">
                <Button
                  onClick={() => {
                    modal.actions.openModal({ modal: "CreateTask", title: "Add Task", params: { organizations } });
                  }}
                >
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        </div>
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
