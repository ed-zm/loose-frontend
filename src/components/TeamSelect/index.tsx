import React from "react";
import Select, { Option } from "../Select";
import useTeamSelect from "loose-components/src/components/TeamSelect";

const TeamSelect = ({ team, setTeam }) => {
  const { teams } = useTeamSelect();
  return (
    <Select
      onChange={(e) => setTeam(e.target.value)}
      value={team}
      items={teams}
      renderItem={(team) => (
        <Option key={team.id} value={team.id}>
          {team.name}
        </Option>
      )}
    >
      <Option key="team-select" value={""}>
        Personal
      </Option>
    </Select>
  );
};

export default TeamSelect;
