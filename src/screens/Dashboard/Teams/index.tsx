import React, { useContext } from "react";
import useTeams from "loose-components/src/screens/Dashboard/Teams";
import TeamCard from "../../../components/TeamCard";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";

const Teams = () => {
  const { data } = useTeams();
  const modal = useContext(ModalContext);
  return (
    <div className="teams">
      <div className="teams-create-button">
        <Button
          onClick={() => {
            modal.actions.openModal({ modal: "CreateTeam", title: "Create Team" });
          }}
        >
          Create Team
        </Button>
      </div>
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
