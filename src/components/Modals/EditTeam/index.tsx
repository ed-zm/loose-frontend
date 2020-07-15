import React from "react";
import useEditTeam from "loose-components/src/components/Modals/EditTeam";
import Input from "../../Input";
import Button from "../../Button";
import "./index.scss";

const EditTeam = ({ team, closeModal }) => {
  const { onUpdateTeam, name, setName, loading } = useEditTeam({ team });
  return (
    <div className="edit-team">
      <Input type="text" placeholder="team name" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="edit-team-buttons">
        <Button
          onClick={async () => {
            await onUpdateTeam();
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

export default EditTeam;
