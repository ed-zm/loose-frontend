import React from "react";
import Link from "next/link";
import "./index.scss";

const TeamCard = ({ team }) => {
  return (
    <div className="team-card">
      <Link key={team.id} href="/dashboard/team/[id]" as={`/dashboard/team/${team.id}`}>
        <a className="team-card-content-title-name">{team.name}</a>
      </Link>
      <div className="team-card-avatars">
        {["", ""].map((member) => (
          <div className="team-card-content-members-member">
            <img
              className="avatar avatar-small"
              alt={team.name}
              src={team.avatar || "/default_profile.png"}
              width="32"
              height="32"
            />
          </div>
        ))}
      </div>
      <div>{`${team.users.length} members`}</div>
    </div>
  );
};

export default TeamCard;
