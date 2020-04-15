import React from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import useTeam from 'loose-components/src/screens/Dashboard/Team'

const Team = () => {
  const router = useRouter()
  const { id } = router.query
  const {
		data,
		removingMember,
		addingMember,
		onRemoveMember,
		onAddMember,
		member,
		setMember,
		members
  } = useTeam({ id })
  return(
    <div>
      { data && data.team &&
        <div>
          <div>{data.team.name}</div>
          <div>{moment(data.team.createdAt).format('DD/MMM/YYYY HH:mm')}</div>
          <div>Members</div>
          <div>
            {data.team.users && data.team.users.map(member =>
              <div>
                <span>{member.firstName} {member.lastName}</span>
                <button
                  onClick = {onRemoveMember}
                  disabled = { removingMember }
                >
                  remove
                </button>
              </div>  
            )}
          </div>
          <div>
            <select onChange = {e => setMember(e.target.value)} value = {member}>
              { members &&
                members.users &&
                members.users.map(m =>
                  <option key = {m.id} value = {m.id}>{m.firstName} {m.lastName}</option>
              )}
            </select>
            <button
              onClick = {onAddMember}
              disabled = { addingMember }
            >
              Add Member
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default Team