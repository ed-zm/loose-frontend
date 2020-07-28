import React, { useContext } from "react";
import OrganizationCard from "../../../components/OrganizationCard";
import Button from "../../../components/Button";
import useOrganizations from "loose-components/src/screens/Dashboard/Organizations";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import Input from "../../../components/Input";
import "./index.scss";

const Organizations = () => {
  const { organizations, setNameFilter, nameFilter, onSetCursor, pageInfo, loading } = useOrganizations();
  const modal = useContext(ModalContext);
  return (
    <div className="organizations">
      <div className="organizations-create-button">
        <Input placeholder="Find a Organization" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
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
      <div className="pagination">
        <a
          // className="previous_page"
          onClick={() => onSetCursor("BEFORE")}
          aria-disabled={loading || !pageInfo.hasPreviousPage}
        >
          Previous
        </a>
        {/* <em aria-current="page">1</em>
        <a href="#url" aria-label="Page 2">
          2
        </a>
        <a href="#url" aria-label="Page 3">
          3
        </a> */}
        <a
          onClick={() => onSetCursor("AFTER")}
          // className="next_page"
          // rel="next"
          // href="#url"
          // aria-label="Next Page"
          aria-disabled={loading || !pageInfo.hasNextPage}
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default Organizations;
