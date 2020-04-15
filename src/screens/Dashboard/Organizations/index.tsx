import React from 'react'
import useOrganizations from 'loose-components/src/screens/Dashboard/Organizations'

const Organizations = () => {
  const {
    onCreateOrganization,
    name,
    setName,
    data
  } = useOrganizations()
  return(
    <div>
      <div>
        <input type = 'text' placeholder = 'organization name' value = {name} onChange = { e => setName(e.target.value)}/>
        <button onClick = { onCreateOrganization }> Create Organization </button>
      </div>
      <ul>
        {data && data.organizations && data.organizations.map(organization =>
          <li key = {organization.id}>
            <div>{organization.name}</div>
          </li>  
        )}
      </ul>
    </div>
  )
}

export default Organizations