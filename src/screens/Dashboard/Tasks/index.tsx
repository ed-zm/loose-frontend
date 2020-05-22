import React, { useContext } from "react";
import useTasks from "loose-components/src/screens/Dashboard/Tasks";
import TaskCard from "../../../components/TaskCard";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";

const Tasks = () => {
  const modal = useContext(ModalContext);
  const { sortedTasks } = useTasks();
  return (
    <div className="Box mt-3 Box--responsive hx_Box--firstRowRounded0">
      <Button
        onClick={() => {
          modal.actions.openModal({ modal: "CreateTask", title: "Add Task", params: { tasks: sortedTasks } });
        }}
      >
        Add Task
      </Button>
      <div className="Box-header d-flex flex-justify-between">
        <div className="mr-3 d-none d-md-block">
          <input type="checkbox" checked={false} onChange={() => {}} />
        </div>
        <div className="table-list-filters flex-auto d-flex min-width-0">
          <div className="flex-auto d-none d-lg-block no-wrap">
            <div className="table-list-header-toggle states flex-auto pl-0">
              <a className="btn-link selected">
                <svg
                  className="octicon octicon-issue-opened"
                  viewBox="0 0 14 16"
                  version="1.1"
                  width="14"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
                  ></path>
                </svg>
                # Open
              </a>
              <a className="btn-link">
                <svg
                  className="octicon octicon-check"
                  viewBox="0 0 12 16"
                  version="1.1"
                  width="12"
                  height="16"
                  aria-hidden="true"
                >
                  <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
                </svg>
                # Closed
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="tasks-cards-container">
        {sortedTasks.map((task) => (
          // <div>
          <TaskCard task={task} />
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
