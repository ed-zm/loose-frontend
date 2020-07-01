import React, { useState } from "react";
import FileReaderInput from "react-file-reader-input";
import { useRouter } from "next/router";
import Cropper from "../../../components/Cropper";
import Button from "../../../components/Button";
import useUser from "loose-components/src/screens/Dashboard/User";
import "./index.scss";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, currentPicture, fileType, closeCropper, savePicture, changeProfilePicture } = useUser({ id });
  const [tab, setTab] = useState("REPOSITORIES");
  return (
    <div className="user">
      {data && data.user && (
        <div className="user-profile">
          <img className="avatar" src={data.user.avatar || "/default_profile.png"} width={260} height={260} />
          <FileReaderInput type="file" onChange={async (e, pic) => await changeProfilePicture(pic)}>
            <Button>Choose Picture</Button>
          </FileReaderInput>
          {/* <div>{data.user.email}</div> */}
          <div className="user-profile-name-container">
            <span className="h2 user-profile-name">{`${data.user.firstName} ${data.user.lastName}`}</span>
            <span className="h3 user-profile-username">{data.user.username}</span>
          </div>
          <p className="user-profile-biography">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <button className="user-profile-button btn mr-2" type="button">
            Edit Profile
          </button>
        </div>
      )}
      <div>
        <nav className="UnderlineNav" aria-label="Foo bar">
          <div className="UnderlineNav-body">
            <a
              onClick={() => setTab("REPOSITORIES")}
              className="UnderlineNav-item"
              aria-current={tab === "REPOSITORIES"}
            >
              <svg
                className="octicon octicon-repo"
                viewBox="0 0 12 16"
                version="1.1"
                width="12"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                ></path>
              </svg>
              <span> Repositories</span>
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
            <a
              onClick={() => {
                setTab("PROJECTS");
              }}
              className="UnderlineNav-item"
              aria-current={tab === "PROJECTS"}
            >
              <span> Projects</span>
            </a>
          </div>
        </nav>
        <ul className="Box">
          <li className="teams-list-item Box-header">
            <h3 className="Box-title">Filters</h3>
          </li>
          {data &&
            ["repository1", "repository2"].map((repository) => (
              <li className="repositorys-list-item Box-body">
                <span>Repository</span>
              </li>
            ))}
        </ul>
      </div>
      {currentPicture && fileType && (
        <Cropper closeCropper={closeCropper} src={currentPicture} fileType={fileType} savePicture={savePicture} />
      )}
    </div>
  );
};

export default User;
