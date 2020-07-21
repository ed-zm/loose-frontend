import React from "react";
import Input from "../Input";
import useSearch from "loose-components/src/components/Search";
import "./index.scss";

const Search = ({ type, children }) => {
  const { hint, setHint, users, refetch, searching } = useSearch({ type });
  return (
    <div className="invite">
      <Input value={hint} onChange={(e) => setHint(e.target.value)} placeholder="type name" />
      {children({ items: users, refetch, searching })}
    </div>
  );
};

export default Search;
