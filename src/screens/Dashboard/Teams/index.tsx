import React from 'react'
import useTeams from 'loose-components/src/screens/Dashboard/Teams'
import List from '../../../components/List'
import TeamCard from '../../../components/TeamCard'
import './index.scss'

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
    <div className = 'teams'>
      <input type = 'text' placeholder = 'name' value = {name} onChange = { e => setName(e.target.value) }/>
      <select onChange = {e => setOrganization(e.target.value)} value = {organization}>
        { orgs &&
          orgs.organizations &&
          orgs.organizations.map(o =>
            <option key = {o.id} value = {o.id}>{o.name}</option>
        )}
      </select>
      <button onClick = { onCreateTeam } disabled = { creatingTeam || !organization }>Create Team</button>
      <List
        items = {data && data.teams}
        renderItem = { team => <TeamCard team = {team} />}
      />
    </div>
  )
}

export default Teams