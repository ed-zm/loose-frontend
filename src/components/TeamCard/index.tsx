import React from 'react'
import Link from 'next/link'
import './index.scss'
import Button from '../Button'

const TeamCard = ({ team }) => {
  return(
    <div className = 'team-card'>
      <div className = 'team-card-content'>
        <div className = 'team-card-content-title'>
        <img src = '/default_profile.png' className = 'team-card-content-title-avatar'/>
          <Link key = {team.id} href = '/dashboard/team/[id]' as = {`/dashboard/team/${team.id}`}> 
            <a className = 'team-card-content-title-name'>{team.name}</a>
          </Link>
        </div>
        <p className = 'team-card-content-description'>
          No description
        </p>
        <div className = 'team-card-content-members'>
          {['', '', '', '', ''].map(member =>
            <div className = 'team-card-content-members-member'>
              <img src = '/default_profile.png' className = 'team-card-content-members-member-avatar'/>
              <a className = 'team-card-content-members-member-name'>Name L.</a>
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

export default TeamCard