import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";
import OrganizationCard from "../../../components/OrganizationCard";
import Button from "../../../components/Button";
import useOrganizations from "loose-components/src/screens/Dashboard/Organizations";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import "./index.scss";

const Organizations = () => {
  const { organizations, setNameFilter, nameFilter, onFetchMore, pageInfo, loading, variables } = useOrganizations();
  const modal = useContext(ModalContext);
  return (
    <div className="organizations">
      <div className="organizations-create-button">
        <Input placeholder="Find a Organization" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <Button
          onClick={() => {
            modal.actions.openModal({
              modal: "CreateOrganization",
              title: "Create Organization",
              params: { variables },
            });
          }}
        >
          Create Organization
        </Button>
      </div>
      <ul className="Box">
        <li className="organizations-list-item Box-header">
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
          {organizations.map((organization) => (
            <li className="organizations-list-item Box-body">
              <OrganizationCard organization={organization} />
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
};

export default Organizations;
