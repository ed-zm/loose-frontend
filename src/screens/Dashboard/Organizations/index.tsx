import React from 'react'
import OrganizationCard from '../../../components/OrganizationCard'
import useOrganizations from 'loose-components/src/screens/Dashboard/Organizations'
import List from '../../../components/List'
import './index.scss'

const Organizations = () => {
  const {
    onCreateOrganization,
    name,
    setName,
    data
  } = useOrganizations()
  return(
    <div className = 'organizations'>
      <div>
        <input type = 'text' placeholder = 'organization name' value = {name} onChange = { e => setName(e.target.value)}/>
        <button onClick = { onCreateOrganization }> Create Organization </button>
      </div>
      <List
        items = {data && data.organizations}
        renderItem = { organization => <OrganizationCard organization = {organization} />}
      />
    </div>
  )
}

export default Organizations