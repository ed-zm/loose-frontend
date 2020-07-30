import React from "react";
import Button from "../../../components/Button";
import useTaskAssign from "loose-components/src/components/Modals/AssignTask";
import UsersList from "../../Lists/Users";

const AssignTask = ({ task, closeModal }) => {
  const { assigningTask, onAssignTask } = useTaskAssign({ task });
  return (
    <div>
      <UsersList
        action={({ user }) => (
          <Button
            onClick={async () => {
              await onAssignTask(user);
              closeModal();
            }}
            disabled={assigningTask}
            loading={assigningTask}
          >
            Assign
          </Button>
        )}
      />
    </div>
  );
};

export default AssignTask;
