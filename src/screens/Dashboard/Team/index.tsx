import React, { useContext } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import useTeam from "loose-components/src/screens/Dashboard/Team";
import TaskCard from "../../../components/TaskCard";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";
import List from "../../../components/List";
import UserCard from "../../../components/UserCard";

const Team = () => {
  const router = useRouter();
  const { actions } = useContext(ModalContext);
  const { id } = router.query;
  const { data, teamTasks, onDeleteTeam, tab, setTab } = useTeam({
    id,
  });
  return (
    <div className="team">
      {data && data.team && (
        <React.Fragment>
          <div className="team-profile">
            <img className="avatar" src={"/default_profile.png"} width={260} height={260} />
            <span className="h2">{data.team.name}</span>
            <div>{moment(data.team.createdAt).format("DD/MMM/YYYY HH:mm")}</div>
          </div>
          <div className="team-content">
            <div className="team-content-buttons">
              <Button
                onClick={() => {
                  actions.openModal({
                    modal: "EditTeam",
                    title: "Edit Team",
                    params: { team: data.team },
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
                  <List items={teamTasks} renderItem={(task) => <TaskCard task={task} />} />
                </div>
              )}
              {tab === "USERS" && (
                <div className="team-content-render-users">
                  <List items={data.team.users} renderItem={(member) => <UserCard user={member} />} />
                  <Button
                    onClick={() => {
                      actions.openModal({
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
        </React.Fragment>
      )}
    </div>
  );
};

export default Team;
