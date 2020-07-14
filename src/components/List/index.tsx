import React from "react";
import Loading from "../Loading";
import "./index.scss";

const List = ({ items = [], loading = false, renderItem }) => {
  return (
    <ul className="Box list">
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </ul>
  );
};

export default List;
