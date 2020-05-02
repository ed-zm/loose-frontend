import React, { useContext } from 'react'
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import GithubRepos from './GithubRepos'
import './index.scss'

const Modal = () => {
  const { open, modal, params, actions, title, style = {}, ...rest } = useContext(ModalContext);
  if(!open) return null
  return(
    <div className = 'modal-container'>
      <div className = 'modal'>
        <span className = 'modal-title'>
          { title }
        </span>
        <div>
          { modal === 'GithubRepos' && <GithubRepos { ...params } />}
        </div>
      </div>
    </div>
  )
}

export default Modal