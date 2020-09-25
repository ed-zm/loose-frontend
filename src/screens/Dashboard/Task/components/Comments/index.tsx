import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import useTaskComments from "loose-components/src/screens/Dashboard/Task/components/Comments";
import TextAreaMD from "../../../../../components/TextAreaMD";
import Button from "../../../../../components/Button";
import Comment from "./Comment";
import Loading from "../../../../../components/Loading";
import "./index.scss";

const Comments = ({ task }) => {
  const {
    loading,
    comments,
    comment,
    setComment,
    creatingComment,
    onCreateComment,
    setMentions,
    continueFetching,
    onFetchMore,
  } = useTaskComments({
    task,
  });
  return (
    <div className="task-comments">
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          loading || !continueFetching ? null : onFetchMore();
        }}
        hasMore={continueFetching}
        loader={<div />}
        useWindow={false}
      >
        {comments.map((comment) => (
          <Comment comment={comment} task={task} />
        ))}
      </InfiniteScroll>
      <TextAreaMD
        placeholder="description"
        value={comment}
        onChange={async (e) => {
          const value = e.target.value;
          const found = value.match(/([@][\w_-]+)/gi);
          if (found) {
            await setMentions(found);
          }
          await setComment(value);
        }}
      />
      <Button className="task-comments-create-button" onClick={onCreateComment} disabled={creatingComment}>
        comment
      </Button>
    </div>
  );
};

export default Comments;
