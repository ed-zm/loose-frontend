import React from "react";
import Select, { Option } from "../Select";
import useOrganizationMemberSelect from "loose-components/src/components/OrganizationMemberSelect";

const OrganizationMemberSelect = ({ member, setMember, where, organizationId }) => {
  const { members } = useOrganizationMemberSelect({ where, organizationId });
  return (
    <Select
      onChange={(e) => setMember(e.target.value)}
      value={member}
      items={members}
      renderItem={(member) => (
        <Option key={member.id} value={member.id}>
          {member.firstName} {member.lastName}
        </Option>
      )}
    >
      <Option key="organization-member-select" value={""}>
        Personal
      </Option>
    </Select>
  );
};

export default OrganizationMemberSelect;
