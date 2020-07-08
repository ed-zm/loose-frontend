import React from "react";
import moment from "moment";
import useTaskComments from "loose-components/src/screens/Dashboard/Task/components/Comments";
import TextAreaMD from "../../../../../components/TextAreaMD";
import Button from "../../../../../components/Button";
import "./index.scss";

const Comments = ({ task }) => {
  const { data, comment, setComment, creatingComment, onCreateComment, setMentions } = useTaskComments({ task });
  return (
    <div className="task-comments">
      {data &&
        data.comments &&
        data.comments.map(({ id, user: { firstName, lastName }, text, createdAt }) => (
          <div key={id} className="Box">
            <div className="Box-header Box-header--gray">
              <h3 className="Box-title">
                {firstName} {lastName}
              </h3>
            </div>
            <div className="Box-body">{text}</div>
          </div>
        ))}
      <TextAreaMD placeholder="description" value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={onCreateComment} disabled={creatingComment}>
        comment
      </Button>
    </div>
  );
};

export default Comments;
