import React from 'react'
import useGithubColumns from 'loose-components/src/components/Modals/GithubColumns'
import List from '../../List'
import Button from '../../Button'
import GithubButton from '../../GithubButton'



const GithubColumns = ({ project, organization, closeModal }) => {
  const {
    columns,
    loadingColumns,
    columnsError,
    onImportGithubCards
  } = useGithubColumns({ organization, project })
  return(
    <div>
      <List
        items = {columns}
        renderItem = { column =>
            <li>{column.name}
            <GithubButton onClick = {() => onImportGithubCards(column.id) }>
                Import Cards
            </GithubButton>
            </li>
        }
      />
      <Button onClick = { closeModal }>
        Cancel
      </Button>
    </div>
  )
}

export default GithubColumns