import React from "react";
import TextAreaMD from "../../TextAreaMD";
import Input from "../../Input";
import Button from "../../Button";
import Select, { Option } from "../../Select";
import useCreateTask from "loose-components/src/components/Modals/CreateTask";
import "./index.scss";

const CreateTask = ({ tasks, variables, closeModal }) => {
  const {
    orgs,
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
      <Select
        onChange={(e) => setOrganization(e.target.value)}
        value={organization}
        items={orgs && orgs.organizations && orgs.organizations}
        renderItem={(org) => (
          <Option key={org.id} value={org.id}>
            {org.name}
          </Option>
        )}
      >
        <Option key="personal-task-select" value={""}>
          Personal
        </Option>
      </Select>
      {organization && (
        <React.Fragment>
          <input
            name="team-task"
            type="checkbox"
            checked={teamTask}
            onChange={() => {
              setTeamTask(!teamTask);
            }}
          />
          <label for="team-task">Team Task</label>
          {teamTask && (
            <Select
              onChange={(e) => setTeam(e.target.value)}
              value={team}
              items={teams}
              renderItem={(team) => (
                <Option key={team.id} value={team.id}>
                  {team.name}
                </Option>
              )}
            />
          )}
        </React.Fragment>
      )}
      <Button onClick={onCreateTask} disabled={creatingTask}>
        Create Task
      </Button>
    </div>
  );
};

export default CreateTask;
