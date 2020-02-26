import React, { useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ORGANIZATIONS, CREATE_ORGANIZATION } from './index.graphql'
import { UserContext } from '../../../contexts/User'

const Organizations = () => {
  const user = useContext(UserContext)
  const { data } = useQuery(ORGANIZATIONS)
  const [ createOrganization ] = useMutation(CREATE_ORGANIZATION)
  const [ name, setName ] = useState('')
  const onCreateOrganization = async () => {
    createOrganization({ variables: {
      name,
      userId: user.id
    },
    optimisticResponse: {
      __typename: 'Mutation',
      createOrganization: {
        __typename: "Organization",
        id: "-1",
        name,
        owner: {
          id: user.id,
          __typename: "User"
        }
      }
    },
    update: (proxy, { data: { createOrganization }}) => {
      const data = proxy.readQuery({ query: ORGANIZATIONS })
      // @ts-ignore
      const newOrganizations = data.organizations.slice()
      newOrganizations.push(createOrganization)
      proxy.writeQuery({ query: ORGANIZATIONS, data: { organizations: newOrganizations }})
    }
  })
  }
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