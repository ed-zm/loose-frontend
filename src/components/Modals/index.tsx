import React, { useContext } from 'react'
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import GithubRepos from './GithubRepos'
import GithubIssues from './GithubIssues'
import CreateTask from './CreateTask'
import './index.scss'

const Modal = () => {
  const { open, modal, params, actions, title, style = {}, ...rest } = useContext(ModalContext);
  if(!open) return null
  return(
    <div className = 'modal-container' >
      <div className = 'modal' onClick = { () => {}}>
        <span className = 'modal-title'>
          { title }
        </span>
        <div>
          { modal === 'GithubIssues' && <GithubIssues { ...params } closeModal = { actions.closeModal } />}
          { modal === 'GithubRepos' && <GithubRepos { ...params } closeModal = { actions.closeModal } />}
          { modal === 'CreateTask' && <CreateTask { ...params } closeModal = { actions.closeModal } /> }

        </div>
      </div>
    </div>
  )
}

export default Modal