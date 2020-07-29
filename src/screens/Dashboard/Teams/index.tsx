import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";
import useTeams from "loose-components/src/screens/Dashboard/Teams";
import TeamCard from "../../../components/TeamCard";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import Select, { Option } from "../../../components/Select";

const Teams = () => {
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
  } = useTeams();
  const modal = useContext(ModalContext);
  return (
    <div className="teams">
      <div className="teams-create-button">
        <Input placeholder="Find a Team" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <Select onChange={(e) => setOrderBy(e.target.value)} value={orderBy}>
          <Option value="createdAt_DESC">Newest</Option>
          <Option value="createdAt_ASC">Oldest</Option>
        </Select>
        <Button
          onClick={() => {
            modal.actions.openModal({ modal: "CreateTeam", title: "Create Team", params: { variables } });
          }}
        >
          Create Team
        </Button>
      </div>
      <ul className="Box">
        <li className="teams-list-item Box-header">
          <h3 className="Box-title">Filters</h3>
        </li>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            loading || !pageInfo.hasNextPage ? null : onFetchMore();
          }}
          hasMore={pageInfo.hasNextPage}
          loader={<Loading />}
          useWindow={false}
        >
          {teams.map((team) => (
            <li className="teams-list-item Box-body" key={team.id}>
              <TeamCard team={team} />
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
};

export default Teams;
