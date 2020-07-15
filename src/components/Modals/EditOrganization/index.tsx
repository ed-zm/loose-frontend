import React from "react";
import useEditOrganization from "loose-components/src/components/Modals/EditOrganization";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./index.scss";

const EditOrganization = ({ organization, closeModal }) => {
  const { onUpdateOrganization, name, setName, loading } = useEditOrganization({ organization });
  return (
    <div className="edit-organization">
      <Input type="text" placeholder="organization name" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="edit-organization-buttons">
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
    </div>
  );
};

export default EditOrganization;
