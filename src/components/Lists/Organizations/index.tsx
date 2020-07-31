import React, { useContext } from "react";
import OrganizationCard from "../../../components/OrganizationCard";
import Button from "../../../components/Button";
import useOrganizationsList from "loose-components/src/components/Lists/Organizations";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import Input from "../../../components/Input";
import Select, { Option } from "../../../components/Select";
import List from "../../List";
import "./index.scss";

const Organizations = () => {
  const {
    organizations,
    setNameFilter,
    nameFilter,
    onFetchMore,
    pageInfo,
    loading,
    variables,
    ownerOrMember,
    setOwnerOrMember,
    orderBy,
    setOrderBy,
  } = useOrganizationsList();
  const modal = useContext(ModalContext);
  return (
    <div className="organizations-list">
      <div className="organizations-list-create-button">
        <Input placeholder="Find a Organization" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <Select onChange={(e) => setOwnerOrMember(e.target.value)} value={ownerOrMember}>
          <Option value="">All</Option>
          <Option value="OWNER">Owner</Option>
          <Option value="MEMBER">Member</Option>
        </Select>
        <Select onChange={(e) => setOrderBy(e.target.value)} value={orderBy}>
          <Option value="createdAt_DESC">Newest</Option>
          <Option value="createdAt_ASC">Oldest</Option>
        </Select>
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
      <List
        pageInfo={pageInfo}
        onFetchMore={onFetchMore}
        items={organizations}
        renderItem={(organization) => <OrganizationCard organization={organization} />}
      />
    </div>
  );
};

export default Organizations;
