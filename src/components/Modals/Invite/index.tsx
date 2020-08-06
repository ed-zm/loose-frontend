import React, { useState } from "react";
import Button from "../../Button";
import UsersList from "../../Lists/Users";
import Input from "../../Input";
import useInviteModal from "loose-components/src/components/Modals/Invite";

const Invite = ({ onInvite, organization, type, typeId, closeModal }) => {
  const { inviting, setInviting, tab, setTab, email, setEmail } = useInviteModal();
  return (
    <div>
      <nav className="UnderlineNav">
        <div className="UnderlineNav-body">
          <a onClick={() => setTab("EMAIL")} className="UnderlineNav-item" aria-current={tab === "EMAIL"}>
            <span>By Email</span>
          </a>
          <a onClick={() => setTab("SEARCH")} className="UnderlineNav-item" aria-current={tab === "SEARCH"}>
            <span>By Search</span>
          </a>
        </div>
      </nav>
      {tab === "EMAIL" && (
        <div>
          <Input placeholder="mail@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button
            onClick={async () => {
              await setInviting(true);
              await onInvite({ email });
              await setInviting(false);
            }}
            disabled={inviting}
            loading={inviting}
          >
            Invite
          </Button>
        </div>
      )}
      {tab === "SEARCH" && (
        <UsersList
          invite
          type={type}
          typeId={typeId}
          action={({ user, refetch, loading }) => (
            <Button
              onClick={async () => {
                await setInviting(true);
                await onInvite(user.id);
                refetch();
                await setInviting(false);
              }}
              disabled={inviting || loading}
              loading={inviting || loading}
            >
              Invite
            </Button>
          )}
        />
      )}
    </div>
  );
};

export default Invite;
