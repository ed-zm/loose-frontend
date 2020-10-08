import React, { useContext } from "react";
import TaskCard from "../../../components/TaskCard";
import List from "../../../components/List";
import Button from "../../../components/Button";
import usePrio from "loose-components/src/screens/Dashboard/Prio";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";

const Prio = () => {
  const { actions } = useContext(ModalContext);
  const { loading, tasks, onSnooze } = usePrio();
  return (
    <div className="task-list">
      <List
        loading={loading}
        continueFetching={false}
        onFetchMore={() => {}}
        items={tasks}
        renderItem={(task) => (
          <TaskCard task={task}>
            <Button
              onClick={() => {
                actions.openModal({ modal: "Snooze", params: { task, onSnooze } });
              }}
            >
              Snooze
            </Button>
          </TaskCard>
        )}
      />
    </div>
  );
};

export default Prio;
