import React, { useContext } from "react";
import useTeams from "loose-components/src/screens/Dashboard/Teams";
import TeamCard from "../../../components/TeamCard";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";
import Input from "../../../components/Input";

const Teams = () => {
  const { teams, loading, setNameFilter, nameFilter, onSetCursor, pageInfo } = useTeams();
  const modal = useContext(ModalContext);
  return (
    <div className="teams">
      <div className="teams-create-button">
        <Input placeholder="Find a Team" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
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
        {teams.map((team) => (
          <li className="teams-list-item Box-body" key={team.id}>
            <TeamCard team={team} />
          </li>
        ))}
      </ul>
      <div className="pagination">
        <a
          // className="previous_page"
          onClick={() => onSetCursor("BEFORE")}
          aria-disabled={loading || !pageInfo.hasPreviousPage}
        >
          Previous
        </a>
        {/* <em aria-current="page">1</em>
        <a href="#url" aria-label="Page 2">
          2
        </a>
        <a href="#url" aria-label="Page 3">
          3
        </a> */}
        <a
          onClick={() => onSetCursor("AFTER")}
          // className="next_page"
          // rel="next"
          // href="#url"
          // aria-label="Next Page"
          aria-disabled={loading || !pageInfo.hasNextPage}
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default Teams;
