import React from "react";

const CreateTeam = () => {
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
