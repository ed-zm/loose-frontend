import React from "react";
import useOrganizations from "loose-components/src/screens/Dashboard/Organizations";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./index.scss";

const CreateOrganization = ({ closeModal }) => {
  const { onCreateOrganization, name, setName } = useOrganizations();
  return (
    <div className="create-organization-modal">
      <Input type="text" placeholder="organization name" value={name} onChange={(e) => setName(e.target.value)} />
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
