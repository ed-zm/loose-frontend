import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { TEAM, ORGANIZATION_MEMBERS, ADD_MEMBER, REMOVE_MEMBER } from './index.graphql'

const Team = () => {
  const router = useRouter()
  const [ member, setMember ] = useState('')
  const { id } = router.query
  const { data } = useQuery(TEAM, { variables: { id }})
  const [ addMember, { loading: addingMember }] = useMutation(ADD_MEMBER)
  const [ removeMember, { loading: removingMember }] = useMutation(REMOVE_MEMBER)
  const [ organizationMembersQuery, { data: members, refetch: refetchOrganizationMembers }] = useLazyQuery(ORGANIZATION_MEMBERS)
  useEffect(() => {
    if(data && data.team) {
      organizationMembersQuery({ variables: {
        teamId: data.team.id,
        organizationId: data.team.organization.id
      }})
    }
  }, [data])
  useEffect(() => {
    if(members && !!members.users.length) setMember(members.users[0].id)
  }, [members])
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
                  onClick = {async () => {
                    await removeMember({ variables: {
                      teamId: data.team.id,
                      memberId: member.id
                    }})
                    await refetchOrganizationMembers({
                      fetchPolicy: 'cache-and-network'
                    })
                  }}
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
              onClick = {async () => {
                await addMember({
                  variables: {
                    teamId: data.team.id,
                    memberId: member
                  }
                })
                await setMember('')
                await refetchOrganizationMembers({
                  fetchPolicy: 'cache-and-network'
                })
              }}
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