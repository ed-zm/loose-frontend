import React, { useContext } from "react";
import { useRouter } from "next/router";
import Markdown from "react-markdown";
import moment from "moment";
import Labels from "./components/Labels";
import Comments from "./components/Comments";
import useTask from "loose-components/src/screens/Dashboard/Task";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import { UserContext } from "loose-components/src/contexts/User";
import "./index.scss";
import Button from "../../../components/Button";

const Task = () => {
  const router = useRouter();
  const modal = useContext(ModalContext);
  const user = useContext(UserContext);
  const { id } = router.query;
  const { task, loading, error, onDeleteTask, isMember } = useTask({ id });
  return (
    <div className="task">
      {task && (
        <React.Fragment>
          <div className="task-title">
            <div>
              <img
                src="/copy.png"
                onClick={async () => {
                  if (navigator && navigator.clipboard) {
                    await navigator.clipboard.writeText(task.code);
                    alert("copied to clipboard");
                  }
                }}
              />
              <span className="h1">{task.title}</span>
              <span className="h1">{` #${task.code}`}</span>
            </div>
            {user.id === task.createdBy.id && (
              <div className="task-title-buttons">
                <Button
                  onClick={() => {
                    modal.actions.openModal({ modal: "EditTask", title: "Edit Task", params: { task } });
                  }}
                >
                  Edit
                </Button>
                <Button
                  deleteButton
                  onClick={() => {
                    modal.actions.openModal({
                      modal: "Confirm",
                      title: "Delete Task",
                      params: {
                        onOKText: "Delete",
                        onOK: async () => {
                          await onDeleteTask();
                          await router.push("/dashboard");
                        },
                        description: "Are you sure to delete this task?",
                      },
                    });
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="task-created-by">
            <div>
              <span title="Status: open" className="State State--green State--small mr-2">
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
                    d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
                  ></path>
                </svg>
                Open
              </span>
            </div>
            <span className="h5">{`${task.createdBy.firstName} ${task.createdBy.lastName}`}</span>&nbsp;
            <span> created this task on {moment(task.createdAt).format("MMM DD")}</span>
          </div>
          <Markdown className="" source={task.description} />
          {isMember && (
            <div>
              {task.assignedTo ? (
                <div>
                  Assigned To: {task.assignedTo.firstName} {task.assignedTo.lastName}
                </div>
              ) : (
                <div>
                  UNASSIGNED
                  {isMember && (
                    <Button
                      onClick={() => {
                        modal.actions.openModal({ modal: "AssignTask", title: "Assign Task", params: { task } });
                      }}
                    >
                      Assign
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
          <Labels task={task} />

          <div className="task-divider" />
          <Comments task={task} />
        </React.Fragment>
      )}
    </div>
  );
};

export default Task;
