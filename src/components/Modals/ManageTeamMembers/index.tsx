import React from "react";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import useTeam from "loose-components/src/screens/Dashboard/Team";
import "./index.scss";
import List from "../../List";

const ManageTeamMembers = ({ team }) => {
  const { data, removingMember, addingMember, onRemoveMember, onAddMember, member, setMember, members } = useTeam({
    id: team.id,
  });
  return (
    <div className="manage-team-members">
      <List
        items={data.team.users}
        renderItem={(member) => (
          <div className="manage-team-members-card">
            <span>
              {member.firstName} {member.lastName}
            </span>
            <Button
              onClick={async () => {
                await onRemoveMember(member.id);
              }}
              disabled={removingMember}
            >
              remove
            </Button>
          </div>
        )}
      />
      <div className="manage-team-members-select">
        <Select onChange={(e) => setMember(e.target.value)} value={member}>
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
        </Button>
      </div>
    </div>
  );
};

export default ManageTeamMembers;
