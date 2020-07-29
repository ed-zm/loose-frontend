import React from "react";
import Button from "../../Button";
import Select from "../../Select";
import Input from "../../Input";
import useCreateTeam from "loose-components/src/components/Modals/CreateTeam";
import "./index.scss";

const CreateTeam = ({ variables, closeModal }) => {
  const { name, setName, organization, setOrganization, orgs, onCreateTeam, creatingTeam } = useCreateTeam({
    variables,
  });
  return (
    <div className="create-team-modal">
      <Input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Select onChange={(e) => setOrganization(e.target.value)} value={organization}>
        {orgs &&
          orgs.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
      </Select>
      <Button
        onClick={async () => {
          await onCreateTeam({ variables });
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
