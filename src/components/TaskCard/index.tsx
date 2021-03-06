import React, { useState, Children } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import Markdown from "react-markdown";
import Link from "next/link";
import moment from "moment";
import { UPDATE_TASK, UPDATE_RESPONSE_REQUEST } from "./index.graphql";
import "./index.scss";

const TaskCard = ({ task, children }) => {
  const router = useRouter();
  const [updateTask] = useMutation(UPDATE_TASK);
  const [updateResponseRequest] = useMutation(UPDATE_RESPONSE_REQUEST);
  const isResponseRequest = task.__typename === "ResponseRequest";
  // if (isResponseRequest) console.log("task", task.id);
  return (
    <div
      className="task-card"
      // style={{ backgroundColor: task.state === 0 ? "transparent" : "lightgray" }}
    >
      <input
        type="checkbox"
        checked={!!(task.state === 1)}
        onChange={async () => {
          const state = task.state === 0 ? 1 : 0;
          if (isResponseRequest) {
            await updateResponseRequest({
              variables: { id: task.id, state },
              optimisticResponse: {
                __typename: "Mutation",
                updateResponseRequest: {
                  __typename: "ResponseRequest",
                  id: task.id,
                  state,
                },
              },
            });
          } else {
            updateTask({
              variables: {
                id: task.id,
                state,
              },
              optimisticResponse: {
                __typename: "Mutation",
                updateTask: {
                  __typename: "Task",
                  id: task.id,
                  state,
                },
              },
            });
          }
        }}
      />
      <div className="task-text">
        {/* <Link
          href="/dashboard/task/[id]"
          as={`/dashboard/task/${task.__typename === "ResponseRequest" ? task.task.code : task.code}`}
        > */}
        <a
          className="link-gray-dark v-align-middle no-underline h4 js-navigation-open"
          onClick={async () => {
            if (isResponseRequest) {
              await updateResponseRequest({
                variables: { id: task.id, state: 1 },
                optimisticResponse: {
                  __typename: "Mutation",
                  updateResponseRequest: {
                    __typename: "ResponseRequest",
                    id: task.id,
                    state: 1,
                  },
                },
              });
            }
            await router.push(
              "/dashboard/task/[id]",
              `/dashboard/task/${isResponseRequest ? task.task.code : task.code}`
            );
          }}
        >
          <span className="tooltipped tooltipped-e">
            <svg
              className="octicon octicon-issue-opened open"
              viewBox="0 0 14 16"
              version="1.1"
              width="14"
              height="16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
              ></path>
            </svg>
          </span>
          {`${" "}${task.title}`}
        </a>
        {/* </Link> */}
        <div className="mt-1 text-small text-gray">
          <span className="opened-by">
            Created By {`${task.createdBy.firstName} ${task.createdBy.lastName} (@${task.createdBy.username})`}
          </span>
        </div>
        <div className="mt-1 text-small text-gray">
          <span className="opened-by">
            {!!task.assignedTo
              ? `Assigned To ${task.assignedTo.firstName} ${task.assignedTo.lastName} (@${task.assignedTo.username})`
              : `Unassigned`}
          </span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default TaskCard;
