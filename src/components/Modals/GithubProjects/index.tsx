import React, { useContext } from 'react'
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import List from '../../List'
import Button from '../../Button'
import GithubButton from '../../GithubButton'
import './index.scss'

const GithubProjects = ({ projects = [], organization, closeModal }) => {
    const { actions } = useContext(ModalContext);
  return(
    <div className = 'github-repos-modal'>
      <List
        items = {projects}
        renderItem = { project =>
            <li>{project.name}
            <GithubButton onClick = {() => {
                actions.openModal({ modal: "GithubColumns", title: `${project.name} cards`, params: { project, organization }})
            }}>
                Show Columns
            </GithubButton>
            </li>
        }
      />
      <Button className = 'github-repos-modal-button' onClick = { closeModal }>
        Cancel
      </Button>
    </div>
  )
}

export default GithubProjects