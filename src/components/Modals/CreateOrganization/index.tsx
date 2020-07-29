import React from "react";
import useCreateOrganization from "loose-components/src/components/Modals/CreateOrganization";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./index.scss";

const CreateOrganization = ({ variables, closeModal }) => {
  const { onCreateOrganization, name, setName } = useCreateOrganization({ variables });
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
