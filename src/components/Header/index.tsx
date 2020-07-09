import React, { useContext } from "react";
import { UserContext } from "loose-components/src/contexts/User";
import Dropdown from "../Dropdown";
import "./index.scss";
import Link from "next/link";
import router from "next/router";
import Cookies from "js-cookie";

const Header = () => {
  const user = useContext(UserContext);
  return (
    <header className="header-container Header py-lg-0">
      <Link href="/dashboard">
        <div className="header-logo Header-item">Loose Dev</div>
      </Link>
      <div className="Header-item Header-item--full"></div>
      <div className="Header-item"></div>
      <Dropdown>
        <span onClick={() => router.push("/dashboard/user/[id]", `/dashboard/user/${user.id}`)}>
          <img
            src={user.avatar || "/default_profile.png"}
            className="avatar avatar-small header-user-avatar"
            height={20}
            width={20}
          />
          {user.firstName} {user.lastName}
        </span>
        <Link href="/dashboard/organizations">
          <span>My Organizations</span>
        </Link>
        <Link href="/dashboard/teams">
          <span>My Teams</span>
        </Link>
        <span
          onClick={async () => {
            await Cookies.remove("token");
            await user.actions.logout();
            await router.push("/sign-in");
          }}
        >
          Log Out
        </span>
      </Dropdown>
    </header>
  );
};

export default Header;
