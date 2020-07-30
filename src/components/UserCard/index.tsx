import React from "react";
import "./index.scss";

const UserCard = ({ user, action }) => {
  return (
    <div className="user-card">
      <div className="user-card-profile">
        <img src={user.avatar || "/default_profile.png"} className="avatar user-card-profile-avatar" />
        <div className="user-card-profile-names">
          <a className="user-card-profile-names-name">
            {user.firstName}&nbsp;{user.lastName}
          </a>
          <span className="user-card-profile-names-username">{user.username}</span>
        </div>
      </div>
      {!!action && typeof action === "function" && <div>{action()}</div>}
    </div>
  );
};

export default UserCard;
