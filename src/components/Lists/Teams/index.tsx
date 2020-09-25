import React, { useContext } from "react";
import List from "../../List";
import useTeamsList from "loose-components/src/components/Lists/Teams";
import TeamCard from "../../../components/TeamCard";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";
import Input from "../../../components/Input";
import Select, { Option } from "../../../components/Select";

const Teams = ({ organization }) => {
  const {
    teams,
    loading,
    setNameFilter,
    nameFilter,
    onFetchMore,
    pageInfo,
    variables,
    orderBy,
    setOrderBy,
  } = useTeamsList({ organization });
  const modal = useContext(ModalContext);
  return (
    <div className="teams-list">
      <div className="teams-list-create-button">
        <Input placeholder="Find a Team" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <Select onChange={(e) => setOrderBy({ createdAt: e.target.value })} value={orderBy.createdAt}>
          <Option value="desc">Newest</Option>
          <Option value="asc">Oldest</Option>
        </Select>
        <Button
          onClick={() => {
            modal.actions.openModal({ modal: "CreateTeam", title: "Create Team", params: { variables } });
          }}
        >
          Create Team
        </Button>
      </div>
      <List
        loading={loading}
        pageInfo={pageInfo}
        onFetchMore={onFetchMore}
        items={teams}
        renderItem={(team) => <TeamCard team={team} />}
      />
    </div>
  );
};

export default Teams;
