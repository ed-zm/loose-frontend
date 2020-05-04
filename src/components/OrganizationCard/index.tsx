import React from 'react'
import Link from 'next/link'
import './index.scss'
import Button from '../Button'

const OrganizationCard = ({ organization }) => {
  return(
    <div className = 'organization-card'>
      <div className = 'organization-card-content'>
        <div className = 'organization-card-content-title'>
        <img src = '/default_profile.png' className = 'organization-card-content-title-avatar'/>
          <Link key = {organization.id} href = '/dashboard/organization/[id]' as = {`/dashboard/organization/${organization.id}`}> 
            <a className = 'organization-card-content-title-name'>{organization.name}</a>
          </Link>
        </div>
        <p className = 'organization-card-content-description'>
          No description
        </p>
        <div className = 'organization-card-content-members'>
          {['', '', '', '', ''].map(member =>
            <div className = 'organization-card-content-members-member'>
              <img src = '/default_profile.png' className = 'organization-card-content-members-member-avatar'/>
              <a className = 'organization-card-content-members-member-name'>Name L.</a>
            </div>  
          )}
        </div>
      </div>
      <div>
        <Button onClick = { () => {}}>
          Action
        </Button>
      </div>
    </div>
  )
}

export default OrganizationCard