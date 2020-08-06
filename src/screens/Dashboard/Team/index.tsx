import React, { useContext } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import useTeam from "loose-components/src/screens/Dashboard/Team";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";
import UsersList from "../../../components/Lists/Users";
import TasksList from "../../../components/Lists/Tasks";

const Team = () => {
  const router = useRouter();
  const { actions } = useContext(ModalContext);
  const { id } = router.query;
  const { team, onDeleteTeam, tab, setTab } = useTeam({
    id,
  });
  return (
    <div className="team">
      {team && (
        <React.Fragment>
          <div className="team-profile">
            <img className="avatar" src={"/default_profile.png"} width={260} height={260} />
            <span className="h2">{team.name}</span>
            <div>{moment(team.createdAt).format("DD/MMM/YYYY HH:mm")}</div>
          </div>
          <div className="team-content">
            <div className="team-content-buttons">
              <Button
                onClick={() => {
                  actions.openModal({
                    modal: "EditTeam",
                    title: "Edit Team",
                    params: { team },
                  });
                }}
              >
                Edit
              </Button>
              <Button
                deleteButton
                onClick={() => {
                  actions.openModal({
                    modal: "Confirm",
                    title: "Delete Team",
                    params: {
                      onOKText: "Delete",
                      onOK: async () => {
                        await onDeleteTeam();
                        await router.push("/dashboard/teams");
                      },
                      description: "Are you sure to delete this team?",
                    },
                  });
                }}
              >
                Delete
              </Button>
            </div>
            <nav className="UnderlineNav">
              <div className="UnderlineNav-body">
                <a onClick={() => setTab("TASKS")} className="UnderlineNav-item" aria-current={tab === "TASKS"}>
                  <span>Tasks</span>
                </a>
                <a onClick={() => setTab("USERS")} className="UnderlineNav-item" aria-current={tab === "USERS"}>
                  <span>Members</span>
                </a>
              </div>
            </nav>
            <div className="team-content-render">
              {tab === "TASKS" && (
                <div className="team-content-render-tasks">
                  <TasksList team={team} />
                </div>
              )}
              {tab === "USERS" && (
                <div className="team-content-render-users">
                  <UsersList team={team} key="team-members-list" />
                  <Button
                    onClick={() => {
                      actions.openModal({
                        modal: "ManageTeamMembers",
                        title: "Manage Team Members",
                        params: { team },
                      });
                    }}
                  >
                    Manage Members
                  </Button>
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Team;
