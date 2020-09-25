import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../Loading";
import "./index.scss";

const List = ({ items = [], loading = false, renderItem, onFetchMore = () => {}, continueFetching }) => {
  return (
    <div className="Box">
      <div className="Box-header d-flex flex-justify-between"></div>
      {loading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          pageStart={0}
          element="ul"
          loadMore={async () => {
            loading || !continueFetching ? null : await onFetchMore();
          }}
          hasMore={continueFetching}
          loader={<div />}
          useWindow={false}
        >
          {!!items.length ? (
            items.map((item) => (
              <li key={`${item.__typename}-${item.id}`} className="list-item Box-body">
                {renderItem(item)}
              </li>
            ))
          ) : (
            <span className="list-no-items-text" key="list-no-available">
              {" "}
              No Items Available{" "}
            </span>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default List;
