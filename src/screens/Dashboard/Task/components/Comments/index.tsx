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
    pageInfo,
    onFetchMore,
  } = useTaskComments({
    task,
  });
  return (
    <div className="task-comments">
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          loading || !pageInfo.hasNextPage ? null : onFetchMore();
        }}
        hasMore={pageInfo.hasNextPage}
        loader={<Loading key="comments-loader-key" />}
        useWindow={false}
      >
        {comments.map((comment) => (
          <Comment comment={comment} task={task} />
        ))}
      </InfiniteScroll>
      <TextAreaMD placeholder="description" value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button className="task-comments-create-button" onClick={onCreateComment} disabled={creatingComment}>
        comment
      </Button>
    </div>
  );
};

export default Comments;
