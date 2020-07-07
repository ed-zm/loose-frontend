import React from "react";
import Button from "../../Button";
import Select from "../../Select";
import Input from "../../Input";
import useTeams from "loose-components/src/screens/Dashboard/Teams";
import "./index.scss";

const CreateTeam = ({ closeModal }) => {
  const { name, setName, organization, setOrganization, orgs, onCreateTeam, creatingTeam } = useTeams();
  return (
    <div className="create-team-modal">
      <Input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Select onChange={(e) => setOrganization(e.target.value)} value={organization}>
        {orgs &&
          orgs.organizations &&
          orgs.organizations.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
      </Select>
      <Button
        onClick={async () => {
          await onCreateTeam();
          await closeModal();
        }}
        disabled={creatingTeam || !organization}
      >
        Create Team
      </Button>
    </div>
  );
};

export default CreateTeam;
