import React, { useContext } from "react";
import TeamsList from "../../../components/Lists/Teams";
import "./index.scss";

const Teams = () => {
  return (
    <div className="teams">
      <TeamsList />
    </div>
  );
};

export default Teams;
