import React from "react";
import Select, { Option } from "../Select";
import useOrganizationSelect from "loose-components/src/components/OrganizationSelect";

const OrganizationSelect = ({ organization, setOrganization }) => {
  const { organizations } = useOrganizationSelect();
  return (
    <Select
      onChange={(e) => setOrganization(e.target.value)}
      value={organization}
      items={organizations}
      renderItem={(org) => (
        <Option key={org.id} value={org.id}>
          {org.name}
        </Option>
      )}
    >
      <Option key="personal-task-select" value={""}>
        Personal
      </Option>
    </Select>
  );
};

export default OrganizationSelect;
