import React from "react";
import Button from "../../../components/Button";
import useManageTeamMembers from "loose-components/src/components/modals/ManageTeamMembers";
import "./index.scss";
import UsersList from "../../Lists/Users";

const ManageTeamMembers = ({ team }) => {
  const {
    removingMember,
    addingMember,
    onRemoveMember,
    onAddMember,
    member,
    setMember,
    tab,
    setTab,
  } = useManageTeamMembers({
    team,
  });
  return (
    <div className="manage-team-members">
      <nav className="UnderlineNav" style={{ width: "100%" }}>
        <div className="UnderlineNav-body">
          <a onClick={() => setTab("ADD")} className="UnderlineNav-item" aria-current={tab === "ADD"}>
            <span>Add</span>
          </a>
          <a onClick={() => setTab("REMOVE")} className="UnderlineNav-item" aria-current={tab === "REMOVE"}>
            <span>Remove</span>
          </a>
        </div>
      </nav>
      {tab === "ADD" && (
        <UsersList
          key="add-user-to-team"
          organization={team.organization}
          action={({ user, refetch, loading }) => (
            <Button
              onClick={async () => {
                await onAddMember(user.id);
                await refetch();
              }}
              disabled={addingMember}
            >
              Add
            </Button>
          )}
        />
      )}
      {tab === "REMOVE" && (
        <UsersList
          key="remove-user-from-team"
          team={team}
          action={({ user, refetch, loading }) => (
            <Button
              onClick={async () => {
                await onRemoveMember(user.id);
                await refetch();
              }}
              disabled={removingMember}
            >
              Remove
            </Button>
          )}
        />
      )}
      <div className="manage-team-members-select">
        {/* <OrganizationMemberSelect organizationId={"d"} where={where} member={member} setMember={setMember} /> */}
        {/* <Select onChange={(e) => setMember(e.target.value)} value={member}>
          {members &&
            members.users &&
            members.users.map((m) => (
              <option key={m.id} value={m.id}>
                {m.firstName} {m.lastName}
              </option>
            ))}
        </Select>
        <Button onClick={onAddMember} disabled={addingMember}>
          Add Member
        </Button> */}
      </div>
    </div>
  );
};

export default ManageTeamMembers;
