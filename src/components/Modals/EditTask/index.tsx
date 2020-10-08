import React from "react";
import TextAreaMD from "../../TextAreaMD";
import Input from "../../Input";
import Button from "../../Button";
import OrganizationSelect from "../../OrganizationSelect";
import Select, { Option } from "../../Select";
import useEditTask from "loose-components/src/components/Modals/EditTask";
import "./index.scss";

const EditTask = ({ task, closeModal }) => {
  const {
    onUpdateTask,
    title,
    setTitle,
    estimated,
    setEstimated,
    description,
    setDescription,
    updatingTask,
    organization,
    setOrganization,
    priority,
    setPriority,
  } = useEditTask({ task, callback: closeModal });
  console.log("TASK.PRIORITY", task);
  return (
    <div className="tasks-create-task">
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
      <Button onClick={onUpdateTask} disabled={updatingTask}>
        Update Task
      </Button>
      <Button onClick={closeModal}>Cancel</Button>
    </div>
  );
};

export default EditTask;
