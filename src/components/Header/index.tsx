import React, { useContext } from 'react'
import { UserContext } from 'loose-components/src/contexts/User'
import Dropdown from '../Dropdown'
import './index.scss'

const Header = () => {
  const user = useContext(UserContext)
  console.log()
  return(
      <header className = "header-container Header py-lg-0">
        <div className = 'header-logo Header-item'>
          Loose Dev
        </div>
        <div className = 'Header-item Header-item--full'>

        </div>
        <div className = 'Header-item'>
          
        </div>
        {/* <div className = 'header-right-icons-container'> */}
        <Dropdown>
          {/* <div className = 'header-user-container'> */}
            <img src = {user.avatar || '/default_profile.png'} className = 'avatar avatar-small header-user-avatar'/>
            <span className = 'header-user-name-text'>{user.firstName} {user.lastName}</span>
          {/* </div> */}
        </Dropdown>
        {/* </div> */}
      </header>
  )
}

export default Header