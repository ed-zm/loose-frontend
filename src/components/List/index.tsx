import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../Loading";
import "./index.scss";

const List = ({ items = [], loading = false, renderItem, onFetchMore = () => {}, pageInfo }) => {
  return (
    <ul className="Box list">
      <div className="Box-header d-flex flex-justify-between"></div>
      {loading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            loading || (pageInfo && !pageInfo.hasNextPage) ? null : onFetchMore();
          }}
          hasMore={pageInfo ? pageInfo.hasNextPage : false}
          loader={<Loading />}
          useWindow={false}
        >
          <React.Fragment>
            {!!items.length ? (
              items.map((item) => (
                <li key={`${item.__typename}-${item.id}`} className="list-item Box-body">
                  {renderItem(item)}
                </li>
              ))
            ) : (
              <span className="list-no-items-text"> No Items Available </span>
            )}
          </React.Fragment>
        </InfiniteScroll>
      )}
    </ul>
  );
};

export default List;
