import React from "react";
import useTeams from "loose-components/src/screens/Dashboard/Teams";
import List from "../../../components/List";
import TeamCard from "../../../components/TeamCard";
import "./index.scss";

const Teams = () => {
  const { name, setName, organization, setOrganization, orgs, onCreateTeam, creatingTeam, data } = useTeams();
  return (
    <div className="teams">
      <ul className="Box">
        <li className="teams-list-item Box-header">
          <h3 className="Box-title">Filters</h3>
        </li>
        {data &&
          data.teams.map((team) => (
            <li className="teams-list-item Box-body">
              <TeamCard team={team} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Teams;
