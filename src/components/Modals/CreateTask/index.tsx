import React, { useContext, useState, useEffect } from "react";
import TextAreaMD from "../../TextAreaMD";
import Input from "../../Input";
import Button from "../../Button";
import Select, { Option } from "../../Select";
import UsersList from "../../Lists/Users";
import useCreateTask from "loose-components/src/components/Modals/CreateTask";
import OrganizationSelect from "../../OrganizationSelect";
import TeamSelect from "../../TeamSelect";
import { TaskContext } from "loose-components/src/contexts/Task";
import "./index.scss";

const CreateTask = ({ tasks, variables, closeModal }) => {
  const {
    actions: { setDraft },
  } = useContext(TaskContext);
  const [memoDraft, setMemoDraft] = useState(null);
  useEffect(() => {
    if (process.browser) {
      const storedDraft = localStorage.getItem("create-task-draft");
      if (!!storedDraft) {
        setMemoDraft(JSON.parse(storedDraft));
      }
    }
  }, [process.browser]);
  const {
    team,
    setTeam,
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
    setAssignTo,
    assignTo,
    useDraft,
    priority,
    setPriority,
  } = useCreateTask({ tasks, variables, callback: closeModal });
  useEffect(() => {
    if (!!team || !!title || !!estimated || !!description || !!teamTask || !!organization || !!assignTo) {
      console.log("SET DRAFT", !!team, !!title, !!estimated, !!description, !!teamTask, !!organization, !!assignTo);
      setDraft({ team, title, estimated, description, teamTask, organization, assignTo });
    }
  }, [team, title, estimated, description, teamTask, organization, assignTo]);
  return (
    <div className="tasks-create-task">
      {!!memoDraft && (
        <Button
          onClick={async () => {
            await useDraft(memoDraft);
            await localStorage.removeItem("create-task-draft");
            await setMemoDraft(null);
            await setDraft(null);
          }}
        >
          Continue With Draft
        </Button>
      )}
      <Input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input
        type="number"
        placeholder="estimated"
        value={estimated}
        onChange={(e) => setEstimated(parseInt(e.target.value, 10))}
      />
      <Select
        onChange={(e) => {
          setPriority(e.target.value);
        }}
        value={priority}
      >
        <Option value={0}>Low Priority</Option>
        <Option value={1}>Medium Priority</Option>
        <Option value={2}>High Priority</Option>
      </Select>
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
          {false && teamTask && <TeamSelect team={team} setTeam={setTeam} />}
          {!!assignTo && !teamTask && (
            <div className="tasks-create-task-assign-container">
              <span>Assigned To {`${assignTo.firstName} ${assignTo.lastName}`}</span>
              <Button
                onClick={async () => {
                  await setAssignTo(null);
                }}
              >
                Change
              </Button>
            </div>
          )}
          {!teamTask && !assignTo && (
            <div className="Box">
              <UsersList
                organization={organization}
                action={({ user }) => (
                  <Button
                    onClick={async () => {
                      await setAssignTo(user);
                    }}
                  >
                    Assign
                  </Button>
                )}
              />
            </div>
          )}
        </React.Fragment>
      )}
      <Button
        onClick={async () => {
          await onCreateTask();
          await localStorage.removeItem("create-task-draft");
        }}
        disabled={creatingTask}
      >
        Create Task
      </Button>
    </div>
  );
};

export default CreateTask;
