import React from "react";

import useTaskComments from "loose-components/src/screens/Dashboard/Task/components/Comments";
import TextAreaMD from "../../../../../components/TextAreaMD";
import Button from "../../../../../components/Button";
import Comment from "./Comment";
import "./index.scss";

const Comments = ({ task }) => {
  const { data, comment, setComment, creatingComment, onCreateComment, setMentions } = useTaskComments({
    task,
  });
  return (
    <div className="task-comments">
      {data && data.comments && data.comments.map((comment) => <Comment comment={comment} task={task} />)}
      <TextAreaMD placeholder="description" value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={onCreateComment} disabled={creatingComment}>
        comment
      </Button>
    </div>
  );
};

export default Comments;
