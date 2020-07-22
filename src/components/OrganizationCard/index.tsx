import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "loose-components/src/contexts/User";
import "./index.scss";

const OrganizationCard = ({ organization }) => {
  const user = useContext(UserContext);
  return (
    <div className="organization-card">
      <Link key={organization.id} href="/dashboard/organization/[id]" as={`/dashboard/organization/${organization.id}`}>
        <a className="lh-condensed f4">
          <span className="css-truncate-target nested-team-name">{organization.name}</span>
          <span className="Label Label--outline">{organization.owner.id === user.id ? "Owner" : "Member"}</span>
        </a>
      </Link>
      <div>
        {organization.users.map((user) => (
          <img className="avatar avatar-small" alt={user.name} src={user.avatar} width="32" height="32" />
        ))}
      </div>
      <div>{`${organization.users.length} members`}</div>
      <div>{`${organization.teams.length} teams`}</div>
    </div>
  );
};

export default OrganizationCard;
