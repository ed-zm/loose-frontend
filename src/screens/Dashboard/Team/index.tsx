import React, { useContext } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import useTeam from "loose-components/src/screens/Dashboard/Team";
import TaskCard from "../../../components/TaskCard";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";

const Team = () => {
  const router = useRouter();
  const modal = useContext(ModalContext);
  const { id } = router.query;
  const { data, teamTasks, tab, setTab } = useTeam({
    id,
  });
  return (
    <div className="team">
      {data && data.team && (
        <div className="team-profile">
          <img className="avatar" src={"/default_profile.png"} width={260} height={260} />
          <span className="h2">{data.team.name}</span>
          <div>{moment(data.team.createdAt).format("DD/MMM/YYYY HH:mm")}</div>
        </div>
      )}
      <div className="team-content">
        <nav className="UnderlineNav" aria-label="Foo bar">
          <div className="UnderlineNav-body">
            <a onClick={() => setTab("TASKS")} className="UnderlineNav-item" aria-current={tab === "TASKS"}>
              <span>Tasks</span>
            </a>
            <a onClick={() => setTab("USERS")} className="UnderlineNav-item" aria-current={tab === "USERS"}>
              <span>Members</span>
            </a>
          </div>
        </nav>
        {!!teamTasks.length && (
          <ul className="Box">
            <li className="teams-list-item Box-header">
              <h3 className="Box-title">Filters</h3>
            </li>
            {teamTasks.map((task) => (
              <li className="tasks-list-item Box-body">
                <TaskCard task={task} />
              </li>
            ))}
          </ul>
        )}
        {tab === "USERS" && (
          <div>
            <Button
              onClick={() => {
                modal.actions.openModal({
                  modal: "ManageTeamMembers",
                  title: "Manage Team Members",
                  params: { team: data.team },
                });
              }}
            >
              Manage Members
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
