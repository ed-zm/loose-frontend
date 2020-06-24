import React from "react";
import Link from "next/link";
import "./index.scss";
import Button from "../Button";

const OrganizationCard = ({ organization }) => {
  return (
    <li className="Box-body organization-card">
      <Link key={organization.id} href="/dashboard/organization/[id]" as={`/dashboard/organization/${organization.id}`}>
        <a className="lh-condensed f4">
          <span className="css-truncate-target nested-team-name">{organization.name}</span>
        </a>
      </Link>
      <div>
        {organization.users.map((user) => (
          <img className="avatar avatar-small" alt={user.name} src={user.avatar} width="32" height="32" />
        ))}
      </div>
      <div>{`${organization.users.length} members`}</div>
      <div>{`${organization.teams.length} teams`}</div>
    </li>
  );
};

export default OrganizationCard;
