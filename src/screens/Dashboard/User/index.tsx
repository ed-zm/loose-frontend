import React from "react";
import FileReaderInput from "react-file-reader-input";
import { useRouter } from "next/router";
import Cropper from "../../../components/Cropper";
import useUser from "loose-components/src/screens/Dashboard/User";
import "./index.scss";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, currentPicture, fileType, closeCropper, savePicture, changeProfilePicture } = useUser({ id });
  return (
    <div className="user">
      {data && data.user && (
        <div>
          <img className="avatar" src={data.user.avatar || "/static/default_profile.png"} width={260} height={260} />
          {/* <div>{data.user.email}</div> */}
          <span>{`${data.user.firstName} ${data.user.lastName}`}</span>
          <span className="p-nickname vcard-username d-block">{data.user.username}</span>
          <FileReaderInput type="file" onChange={async (e, pic) => await changeProfilePicture(pic)}>
            <button>Choose Picture</button>
          </FileReaderInput>
        </div>
      )}
      {currentPicture && fileType && (
        <Cropper closeCropper={closeCropper} src={currentPicture} fileType={fileType} savePicture={savePicture} />
      )}
    </div>
  );
};

export default User;
