import React from "react";
import TextAreaMD from "../../TextAreaMD";
import Input from "../../Input";
import Button from "../../Button";
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
  } = useEditTask({ task, callback: closeModal });
  return (
    <div className="tasks-create-task">
      <Input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input
        type="number"
        EditT
        placeholder="estimated"
        value={estimated}
        onChange={(e) => setEstimated(parseInt(e.target.value, 10))}
      />
      <TextAreaMD placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button onClick={onUpdateTask} disabled={updatingTask}>
        Update Task
      </Button>
      <Button onClick={closeModal}>Cancel</Button>
    </div>
  );
};

export default EditTask;
