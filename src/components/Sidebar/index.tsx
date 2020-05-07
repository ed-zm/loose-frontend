import React, { useContext } from 'react'
import router from 'next/router'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { UserContext } from 'loose-components/src/contexts/User'
import './index.scss'

const Sidebar = () => {
  const user = useContext(UserContext)
  return(
    <ul className = 'sidebar-container'>
      <li className = 'sidebar-item'>
        <Link href = {`/dashboard`}><a className = 'sidebar-item-link'>Home</a></Link>
      </li>
      <li className = 'sidebar-item'>
        <Link href = '/dashboard/user/[id]' as = {`/dashboard/user/${user.id}`}><a className = 'sidebar-item-link'>My Profile</a></Link>
      </li>
      <li className = 'sidebar-item'>
        <Link href = '/dashboard/organizations'><a className = 'sidebar-item-link'>My Organizations</a></Link>
      </li>
      <li className = 'sidebar-item'>
        <Link href = '/dashboard/teams'><a className = 'sidebar-item-link'>My Teams</a></Link>
      </li>
      <li className = 'sidebar-item'>
        <div 
          onClick = { async () => {
            await Cookies.remove('token')
            await user.actions.logout()
            await router.push('/sign-in')
          }}
        >
          <a className = 'sidebar-item-link'>Log Out</a>
        </div>
      </li>
    </ul>
  )
}

export default Sidebar