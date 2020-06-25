import React from "react";
import useTeams from "loose-components/src/screens/Dashboard/Teams";

const CreateTeam = () => {
  const { name, setName, organization, setOrganization, orgs, onCreateTeam, creatingTeam } = useTeams();
  return (
    <div>
      <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <select onChange={(e) => setOrganization(e.target.value)} value={organization}>
        {orgs &&
          orgs.organizations &&
          orgs.organizations.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
      </select>
      <button onClick={onCreateTeam} disabled={creatingTeam || !organization}>
        Create Team
      </button>
    </div>
  );
};

export default CreateTeam;
