import React, { useState } from "react";
import Button from "../../Button";
import UsersList from "../../Lists/Users";

const Invite = ({ onInvite, organization, type, typeId, closeModal }) => {
  const [inviting, setInviting] = useState(false);
  return (
    <div>
      <UsersList
        organization={organization}
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
    </div>
  );
};

export default Invite;
