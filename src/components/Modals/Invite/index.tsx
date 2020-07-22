import React from "react";
import Search from "../../Search";
import Button from "../../Button";
import List from "../../List";
import Loading from "../../Loading";

const Invite = ({ onInvite, type, typeId, closeModal }) => {
  return (
    <div>
      <Search type={type} typeId={typeId}>
        {({ items, refetch, searching }) => {
          if (searching) return <Loading />;
          return (
            <List
              items={items}
              renderItem={(user) => (
                <div className="manage-team-members-card">
                  <img className="avatar avatar-small" alt={user.name} src={user.avatar} width="32" height="32" />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <Button
                    onClick={async () => {
                      await onInvite(user.id);
                      await refetch();
                    }}
                    // disabled={removingMember}
                  >
                    Invite
                  </Button>
                </div>
              )}
            />
          );
        }}
      </Search>
    </div>
  );
};

export default Invite;
