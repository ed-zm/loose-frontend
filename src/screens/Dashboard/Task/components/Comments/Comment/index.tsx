import React, { useContext } from "react";
import moment from "moment";
import TextAreaMD from "../../../../../../components/TextAreaMD";
import Markdown from "react-markdown";
import useTaskComment from "loose-components/src/screens/Dashboard/Task/components/Comments/Comment";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import Button from "../../../../../../components/Button";
import "./index.scss";

const Comment = ({
  task,
  variables,
  comment: {
    id,
    user: { firstName, lastName },
    text,
    createdAt,
  },
}) => {
  const { actions } = useContext(ModalContext);
  const {
    comment,
    setComment,
    updatingComment,
    onUpdateComment,
    setMentions,
    onDeleteComment,
    deletingComment,
    edit,
    setEdit,
  } = useTaskComment({
    task,
    id,
    text,
    variables,
  });
  return (
    <div key={id} className="Box">
      <div className="Box-header Box-header--gray task-comment-header">
        <h3 className="Box-title">
          {firstName} {lastName}
        </h3>
        <div>
          <button className="btn-octicon" type="button" aria-label="Pencil icon" onClick={() => setEdit(!edit)}>
            <svg
              className="octicon octicon-pencil"
              viewBox="0 0 14 16"
              version="1.1"
              width="14"
              height="16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 011.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"
              ></path>
            </svg>
          </button>
          <button
            className="btn-octicon btn-octicon-danger"
            type="button"
            aria-label="Trashcan icon"
            onClick={() => {
              actions.openModal({
                modal: "Confirm",
                title: "Delete Comment",
                params: {
                  onOKText: "Delete",
                  onOK: async () => {
                    await onDeleteComment();
                    await actions.closeModal();
                  },
                  description: "Are you sure to delete this comment?",
                },
              });
            }}
          >
            <svg
              className="octicon octicon-trashcan"
              viewBox="0 0 12 16"
              version="1.1"
              width="12"
              height="16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {edit ? (
        <React.Fragment>
          <TextAreaMD placeholder="description" value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button onClick={onUpdateComment} disabled={updatingComment}>
            comment
          </Button>
        </React.Fragment>
      ) : (
        <div className="Box task-comment-content">
          <Markdown source={text} className="markdown-body" />
        </div>
      )}
    </div>
  );
};

export default Comment;
