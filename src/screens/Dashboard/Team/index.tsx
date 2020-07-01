import React, { useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import useTeam from "loose-components/src/screens/Dashboard/Team";
import "./index.scss";

const Team = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, removingMember, addingMember, onRemoveMember, onAddMember, member, setMember, members } = useTeam({
    id,
  });
  const [tab, setTab] = useState("TASKS");
  return (
    <div className="team">
      {data && data.team && (
        <div className="team-profile">
          <img className="avatar" src={"/default_profile.png"} width={260} height={260} />
          <span className="h2">{data.team.name}</span>
          <div>{moment(data.team.createdAt).format("DD/MMM/YYYY HH:mm")}</div>
          {/* {/* <div>Members</div> */}
          <div>
            {data.team.users &&
              data.team.users.map((member) => (
                <div>
                  <span>
                    {member.firstName} {member.lastName}
                  </span>
                  <button onClick={onRemoveMember} disabled={removingMember}>
                    remove
                  </button>
                </div>
              ))}
          </div>
          {/* <div>
            <select onChange={(e) => setMember(e.target.value)} value={member}>
              {members &&
                members.users &&
                members.users.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.firstName} {m.lastName}
                  </option>
                ))}
            </select>
            <button onClick={onAddMember} disabled={addingMember}>
              Add Member
            </button>
          </div> */}
        </div>
      )}
      <div>
        <nav className="UnderlineNav" aria-label="Foo bar">
          <div className="UnderlineNav-body">
            <a onClick={() => setTab("TASKS")} className="UnderlineNav-item" aria-current={tab === "TASKS"}>
              <span>Tasks</span>
            </a>
            <a onClick={() => setTab("USERS")} className="UnderlineNav-item" aria-current={tab === "USERS"}>
              <span>Members</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Team;
