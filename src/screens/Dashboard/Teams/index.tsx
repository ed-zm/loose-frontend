import React from 'react'
import useTeams from 'loose-components/src/screens/Dashboard/Teams'
import Link from 'next/link'

const Teams = () => {
  const {
    name,
    setName,
    organization,
    setOrganization,
    orgs,
    onCreateTeam,
    creatingTeam,
    data
  } = useTeams()
  return(
    <div>
      <input type = 'text' placeholder = 'name' value = {name} onChange = { e => setName(e.target.value) }/>
      <select onChange = {e => setOrganization(e.target.value)} value = {organization}>
        { orgs &&
          orgs.organizations &&
          orgs.organizations.map(o =>
            <option key = {o.id} value = {o.id}>{o.name}</option>
        )}
      </select>
      <button onClick = { onCreateTeam } disabled = { creatingTeam || !organization }>Create Team</button>
      <div>
        { data && data.teams && data.teams.map(team =>
          <div>
            <Link href = '/dashboard/team/[id]' as = {`/dashboard/team/${team.id}`}><a>{team.name}</a></Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Teams