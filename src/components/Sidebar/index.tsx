import React, { useContext } from 'react'
import router from 'next/router'
import Link from 'next/link'
import { UserContext } from 'loose-components/src/contexts/User'

const Sidebar = () => {
  const user = useContext(UserContext)
  return(
    <ul>
      <li><Link href = {`/dashboard`} prefetch>Home</Link></li>
      <li><Link href = {`/dashboard/user/${user.id}`} prefetch>My Profile</Link></li>
      <li><Link href = '/dashboard/organizations' prefetch>My Organizations</Link></li>
      <li><Link href = '/dashboard/teams' prefetch>My Teams</Link></li>
      <li><div onClick = { () => {
        user.actions.logout()
        router.push('/sign-in')
      }}>Log Out</div></li>
    </ul>
  )
}

export default Sidebar