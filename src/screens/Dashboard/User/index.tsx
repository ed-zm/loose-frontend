import React from 'react'
import FileReaderInput from 'react-file-reader-input'
import { useRouter } from 'next/router'
import Cropper from '../../../components/Cropper'
import useUser from 'loose-components/src/screens/Dashboard/User'

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data,
    currentPicture,
    fileType,
    closeCropper,
    savePicture,
    changeProfilePicture
  } = useUser({ id })
  return(
    <div>
        {data && data.user &&
          <div>
            <img src = {data.user.avatar || '/static/default_profile.png'} width = {30} height = {30}/>
            <div>{ data.user.email }</div>
            <div>{ data.user.username }</div>
            <div>{ data.user.firstName }</div>
            <div>{ data.user.lastName }</div>
              <FileReaderInput type='file' onChange={ async (e, pic) => await changeProfilePicture(pic) }>
                <button>Choose Picture</button>
              </FileReaderInput>
          </div>
        }
        { currentPicture && fileType && <Cropper closeCropper = {closeCropper} src = { currentPicture } fileType = { fileType } savePicture = { savePicture }/> }
    </div>
  )
}

export default User