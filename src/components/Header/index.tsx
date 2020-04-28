import React, { useContext } from 'react'
import { UserContext } from 'loose-components/src/contexts/User'
import './index.scss'

const Header = () => {
  const user = useContext(UserContext)
  console.log()
  return(
      <div className = "header-container">
        <div className = 'header-logo'>
          Loose Dev
        </div>
        <div className = 'header-right-icons-container'>
          <div className = 'header-user-container'>
            <img src = {user.avatar || '/default_profile.png'} className = 'header-user-avatar'/>
            <span className = 'header-user-name-text'>{user.firstName} {user.lastName}</span>
          </div>
        </div>
      </div>
  )
}

export default Header