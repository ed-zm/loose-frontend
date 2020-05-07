import React, { useContext, useEffect } from 'react'
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import GithubRepos from './GithubRepos'
import GithubIssues from './GithubIssues'
import CreateTask from './CreateTask'
import './index.scss'

const Modal = () => {
  const { open, modal, params, actions, title, style = {}, ...rest } = useContext(ModalContext);
  useEffect(() => {
    if(process.browser) {
      const closeOnEsc = ({ keyCode }) => {
        if(keyCode === 27) actions.closeModal()
      }
      window.addEventListener('keydown', closeOnEsc)
      return () => {
        window.removeEventListener('keydown', closeOnEsc)
      }
    }
  }, [])
  if(!open) return null
  return(
    <div className = 'modal-container' onKeyPress = { console.log } >
      <div  className = 'modal-backdrop' onClick = { actions.closeModal }/>
        <div className = 'modal'>
          <span className = 'modal-title'>
            { title }
            <span className = 'modal-cancel' onClick = { actions.closeModal }>X</span>
          </span>
          <div>
            { modal === 'GithubIssues' && <GithubIssues { ...params } closeModal = { actions.closeModal } />}
            { modal === 'GithubRepos' && <GithubRepos { ...params } closeModal = { actions.closeModal } />}
            { modal === 'CreateTask' && <CreateTask { ...params } closeModal = { actions.closeModal } /> }

          </div>
        </div>
      {/* </div> */}
    </div>
  )
}

export default Modal