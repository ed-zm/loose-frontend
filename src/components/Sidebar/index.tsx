import React, { useContext } from 'react'
import router from 'next/router'
import Link from 'next/link'
import { UserContext } from 'loose-components/src/contexts/User'

const Sidebar = () => {
  const user = useContext(UserContext)
  return(
    <ul>
      <li><Link href = {`/dashboard`}>Home</Link></li>
      <li><Link href = '/dashboard/user/[id]' as = {`/dashboard/user/${user.id}`}>My Profile</Link></li>
      <li><Link href = '/dashboard/organizations'>My Organizations</Link></li>
      <li><Link href = '/dashboard/teams'>My Teams</Link></li>
      <li><div onClick = { () => {
        user.actions.logout()
        router.push('/sign-in')
      }}>Log Out</div></li>
    </ul>
  )
}

export default Sidebar