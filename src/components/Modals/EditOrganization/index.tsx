import React from "react";
import useEditOrganization from "loose-components/src/components/Modals/EditOrganization";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const EditOrganization = ({ organization, closeModal }) => {
  const { onUpdateOrganization, name, setName, loading } = useEditOrganization({ organization });
  return (
    <div>
      <Input type="text" placeholder="organization name" value={name} onChange={(e) => setName(e.target.value)} />
      <Button
        onClick={async () => {
          await onUpdateOrganization();
          await closeModal();
        }}
        disabled={loading}
      >
        Update
      </Button>
      <Button onClick={closeModal}>Cancel</Button>
    </div>
  );
};

export default EditOrganization;
