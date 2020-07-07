import React from "react";
import { useRouter } from "next/router";
import Markdown from "react-markdown";
import moment from "moment";
import Assign from "./components/Assign";
import Labels from "./components/Labels";
import Comments from "./components/Comments";
import useTask from "loose-components/src/screens/Dashboard/Task";
import "./index.scss";

const Task = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error, isMember } = useTask({ id });
  return (
    <div className="task">
      {data && data.task && (
        <div>
          <div>
            <img
              src="/copy.png"
              onClick={async () => {
                if (navigator && navigator.clipboard) {
                  await navigator.clipboard.writeText(data.task.code);
                  alert("copied to clipboard");
                }
              }}
            />
            <span>{data.task.code}</span>
          </div>
          <div className="task-title">
            <span>{data.task.title}</span>
            <div>
              <span title="Status: open" class="State State--green State--small mr-2">
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
          </div>
          <Markdown className="" source={data.task.description} />
          {isMember && (
            <div>
              {data.task.assignedTo ? (
                <div>
                  Assigned To: {data.task.assignedTo.firstName} {data.task.assignedTo.lastName}
                </div>
              ) : (
                <div>UNASSIGNED</div>
              )}
            </div>
          )}
          <div>{moment(data.task.createdAt).format("DD/MMM/YYYY HH:mm")}</div>
          {isMember && <Assign task={data.task} />}
          <Labels task={data.task} />
          <Comments task={data.task} />
        </div>
      )}
    </div>
  );
};

export default Task;
