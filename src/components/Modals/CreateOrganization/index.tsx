import React from "react";
import useOrganizations from "loose-components/src/screens/Dashboard/Organizations";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const CreateOrganization = ({ closeModal }) => {
  const { onCreateOrganization, name, setName } = useOrganizations();
  return (
    <div>
      <Input
        type="text"
        placeholder="organization name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="subnav-search-input input-contrast auto-search-input js-team-search-field"
      />
      <Button
        onClick={async () => {
          await onCreateOrganization();
          await closeModal();
        }}
      >
        Create Organization
      </Button>
    </div>
  );
};

export default CreateOrganization;
