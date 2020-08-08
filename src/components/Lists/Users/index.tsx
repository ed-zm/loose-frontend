import React, { useEffect } from "react";
import UserCard from "../../UserCard";
import List from "../../List";
import Select, { Option } from "../../Select";
import useUsersList from "loose-components/src/components/Lists/Users";
import Input from "../../Input";
import "./index.scss";

const Users = ({ action, team, organization, type, typeId, invite }) => {
  const { users, pageInfo, onFetchMore, name, setName, refetch, loading, orderBy, setOrderBy } = useUsersList({
    team,
    organization,
    type,
    typeId,
    invite,
  });
  useEffect(() => {}, []);
  return (
    <div className="users-list">
      <div className="users-list-header">
        <Input onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
        <Select onChange={(e) => setOrderBy(e.target.value)} value={orderBy}>
          <Option value="firstName_ASC">A-Z</Option>
          <Option value="firstName_DESC">Z-A</Option>
        </Select>
      </div>
      <List
        pageInfo={pageInfo}
        onFetchMore={onFetchMore}
        items={users}
        loading={loading}
        renderItem={(user) => (
          <UserCard user={user} action={action ? () => action({ user, loading, refetch }) : null} />
        )}
      />
    </div>
  );
};

export default Users;
