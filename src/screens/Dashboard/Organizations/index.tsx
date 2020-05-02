import React from 'react'
import Link from 'next/link'
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
          <Link key = {organization.id} href = '/dashboard/organization/[id]' as = {`/dashboard/organization/${organization.id}`}>
            <a>
              {organization.name}
            </a>
          </Link> 
        )}
      </ul>
    </div>
  )
}

export default Organizations