import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { UserContext } from "loose-components/src/contexts/User";
import Dropdown from "../Dropdown";
import "./index.scss";
import Link from "next/link";
import router from "next/router";
import Cookies from "js-cookie";

const Header = () => {
  const user = useContext(UserContext);
  useEffect(() => {
    window.showToast = (message, type) => {
      let options = { type };

      if (!type) {
        options.type = "info";
        options.className = "black-background";
      }

      toast(message, options);
    };
  }, []);
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
        <Link href="/dashboard/prio">
          <span>Prio</span>
        </Link>
        <Link href="/dashboard/organizations">
          <span>My Organizations</span>
        </Link>
        <Link href="/dashboard/teams">
          <span>My Teams</span>
        </Link>
        <span
          onClick={async () => {
            //we need to reset apollo store. PENDING
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
