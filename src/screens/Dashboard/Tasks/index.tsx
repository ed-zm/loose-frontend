import React, { useContext } from "react";
import classNames from "classnames";
import useTasks from "loose-components/src/screens/Dashboard/Tasks";
import TaskCard from "../../../components/TaskCard";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";

const Tasks = () => {
  const modal = useContext(ModalContext);
  const { tasks, state, variables, setState } = useTasks();
  return (
    <div className="tasks">
      <div className="tasks-create-button">
        <Button
          onClick={() => {
            modal.actions.openModal({ modal: "CreateTask", title: "Add Task", params: { tasks, variables } });
          }}
        >
          Add Task
        </Button>
      </div>
      <ul className="Box">
        <div className="Box-header d-flex flex-justify-between">
          <input type="checkbox" checked={false} onChange={() => {}} />
          <div className="table-list-filters flex-auto d-flex min-width-0">
            <a
              className={classNames("btn-link", { selected: !state })}
              onClick={() => {
                setState(0);
              }}
            >
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
              Open
            </a>
            <a
              className={classNames("btn-link", { selected: !!state })}
              onClick={() => {
                setState(1);
              }}
            >
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
              Closed
            </a>
          </div>
        </div>
        {tasks.map((task) => (
          <li className="tasks-list-item Box-body">
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
