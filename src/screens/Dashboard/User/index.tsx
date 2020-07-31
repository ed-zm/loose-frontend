import React, { useContext } from "react";
import FileReaderInput from "react-file-reader-input";
import { useRouter } from "next/router";
import Cropper from "../../../components/Cropper";
import Button from "../../../components/Button";
import useUser from "loose-components/src/screens/Dashboard/User";
import "./index.scss";
import TextArea from "../../../components/TextArea";
import TeamsList from "../../../components/Lists/Teams";
import TasksList from "../../../components/Lists/Tasks";
import OrganizationsList from "../../../components/Lists/Organizations";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    user,
    currentPicture,
    fileType,
    closeCropper,
    savePicture,
    changeProfilePicture,
    tab,
    setTab,
    isYou,
    edit,
    setEdit,
    bio,
    setBio,
    onUpdateProfile,
    updatingProfile,
  } = useUser({
    id,
  });

  return (
    <div className="user">
      {user && (
        <div className="user-profile">
          <img className="avatar" src={user.avatar || "/default_profile.png"} width={260} height={260} />
          <FileReaderInput type="file" onChange={async (e, pic) => await changeProfilePicture(pic)}>
            <Button>Choose Picture</Button>
          </FileReaderInput>
          {/* <div>{user.email}</div> */}
          <div className="user-profile-name-container">
            <span className="h2 user-profile-name">{`${user.firstName} ${user.lastName}`}</span>
            <span className="h3 user-profile-username">{user.username}</span>
          </div>
          {edit ? (
            <TextArea value={bio} onChange={(e) => setBio(e.target.value)} />
          ) : (
            <p className="user-profile-biography">{user.biography}</p>
          )}
          {isYou && (
            <React.Fragment>
              {edit && (
                <Button onClick={onUpdateProfile} disabled={updatingProfile}>
                  Update
                </Button>
              )}
              <button
                className="user-profile-button btn mr-2"
                type="button"
                onClick={() => {
                  setEdit(!edit);
                }}
                disabled={updatingProfile}
              >
                {edit ? "Cancel" : "Edit Profile"}
              </button>
            </React.Fragment>
          )}
        </div>
      )}
      <div className="user-content">
        <nav className="UnderlineNav" aria-label="Foo bar">
          <div className="UnderlineNav-body">
            <a onClick={() => setTab("TASKS")} className="UnderlineNav-item" aria-current={tab === "TASKS"}>
              Tasks
            </a>
            <a
              onClick={() => setTab("ORGANIZATIONS")}
              className="UnderlineNav-item"
              aria-current={tab === "ORGANIZATIONS"}
            >
              Organizations
            </a>
            <a onClick={() => setTab("TEAMS")} className="UnderlineNav-item" aria-current={tab === "TEAMS"}>
              <svg
                className="octicon octicon-jersey"
                viewBox="0 0 14 16"
                version="1.1"
                width="14"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 6l-.5.5v5l.5.5h2l.5-.5v-5L6.5 6h-2zM6 11H5V7h1v4zm6.27-7.25C12.05 2.37 11.96 1.12 12 0H9.02c0 .27-.13.48-.39.69-.25.2-.63.3-1.13.3-.5 0-.88-.09-1.13-.3-.23-.2-.36-.42-.36-.69H3c.05 1.13-.03 2.38-.25 3.75C2.55 5.13 1.95 5.88 1 6v9c.02.27.11.48.31.69.2.21.42.3.69.31h11c.27-.02.48-.11.69-.31.21-.2.3-.42.31-.69V6c-.95-.13-1.53-.88-1.75-2.25h.02zM13 15H2V7c.89-.5 1.48-1.25 1.72-2.25S4.03 2.5 4 1h1c-.02.78.16 1.47.52 2.06.36.58 1.02.89 2 .94.98-.02 1.64-.33 2-.94.36-.59.5-1.28.48-2.06h1c.02 1.42.13 2.55.33 3.38.2.81.69 2 1.67 2.63v8V15zM8.5 6l-.5.5v5l.5.5h2l.5-.5v-5l-.5-.5h-2zm1.5 5H9V7h1v4z"
                ></path>
              </svg>
              <span> Teams</span>
            </a>
          </div>
        </nav>
        {tab === "TASKS" && <TasksList />}
        {tab === "ORGANIZATIONS" && <OrganizationsList />}
        {tab === "TEAMS" && <TeamsList />}
      </div>
      {currentPicture && fileType && (
        <Cropper closeCropper={closeCropper} src={currentPicture} fileType={fileType} savePicture={savePicture} />
      )}
    </div>
  );
};

export default User;
