import React from "react";
import TextAreaMD from "../../TextAreaMD";
import Input from "../../Input";
import Button from "../../Button";
import Select, { Option } from "../../Select";
import useCreateTask from "loose-components/src/components/Modals/CreateTask";
import OrganizationSelect from "../../OrganizationSelect";
import TeamSelect from "../../TeamSelect";
import "./index.scss";

const CreateTask = ({ tasks, variables, closeModal }) => {
  const {
    team,
    setTeam,
    teams,
    onCreateTask,
    title,
    setTitle,
    estimated,
    setEstimated,
    description,
    setDescription,
    teamTask,
    setTeamTask,
    organization,
    setOrganization,
    creatingTask,
  } = useCreateTask({ tasks, variables, callback: closeModal });
  return (
    <div className="tasks-create-task">
      <Input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input
        type="number"
        placeholder="estimated"
        value={estimated}
        onChange={(e) => setEstimated(parseInt(e.target.value, 10))}
      />
      <TextAreaMD placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <OrganizationSelect organization={organization} setOrganization={setOrganization} />
      {organization && (
        <React.Fragment>
          <div style={{ display: "flex" }}>
            <input
              type="checkbox"
              checked={teamTask}
              onChange={() => {
                setTeamTask(!teamTask);
              }}
            />
            <span>Team Task</span>
          </div>
          {teamTask && <TeamSelect team={team} setTeam={setTeam} />}
        </React.Fragment>
      )}
      <Button onClick={onCreateTask} disabled={creatingTask}>
        Create Task
      </Button>
    </div>
  );
};

export default CreateTask;
