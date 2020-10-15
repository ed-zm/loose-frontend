import React, { useContext, useEffect } from "react";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import { TaskContext } from "loose-components/src/contexts/Task";
import GithubOrganizations from "./GithubOrganizations";
import GithubRepos from "./GithubRepos";
import GithubIssues from "./GithubIssues";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import CreateOrganization from "./CreateOrganization";
import EditOrganization from "./EditOrganization";
import CreateTeam from "./CreateTeam";
import EditTeam from "./EditTeam";
import GithubProjects from "./GithubProjects";
import GithubColumns from "./GithubColumns";
import Confirm from "./Confirm";
import Invite from "./Invite";
import ManageTeamMembers from "./ManageTeamMembers";
import AssignTask from "./AssignTask";
import Stripe from "./Stripe";
import Snooze from "./Snooze";
import { XIcon } from "@primer/octicons-react";
import "./index.scss";

const Modal = () => {
  const { open, modal, params, actions, title, style = {}, ...rest } = useContext(ModalContext);
  const { draft } = useContext(TaskContext);
  useEffect(() => {
    if (process.browser) {
      const closeOnEsc = ({ keyCode }) => {
        if (keyCode === 27) actions.closeModal();
      };
      window.addEventListener("keydown", closeOnEsc);
      return () => {
        window.removeEventListener("keydown", closeOnEsc);
      };
    }
  }, []);
  if (!open) return null;
  const closeModal = () => {
    if (modal === "CreateTask") {
      if (draft) {
        console.log("DRAFT", draft);
        const stringifiedDraft = JSON.stringify(draft);
        localStorage.setItem("create-task-draft", stringifiedDraft);
      }
    }
    actions.closeModal();
  };
  return (
    <div className="modal-container" onKeyPress={() => {}}>
      <div className="modal-backdrop" onClick={closeModal} />
      <div className="modal">
        <span className="modal-title">
          {title}
          <span className="modal-cancel" onClick={closeModal}>
            <XIcon size="medium" />
          </span>
        </span>
        <div>
          {modal === "GithubIssues" && <GithubIssues {...params} closeModal={closeModal} />}
          {modal === "GithubRepos" && <GithubRepos {...params} closeModal={closeModal} />}
          {modal === "GithubOrganizations" && <GithubOrganizations {...params} closeModal={closeModal} />}
          {modal === "CreateTask" && <CreateTask {...params} closeModal={closeModal} />}
          {modal === "EditTask" && <EditTask {...params} closeModal={closeModal} />}
          {modal === "CreateTeam" && <CreateTeam {...params} closeModal={closeModal} />}
          {modal === "EditTeam" && <EditTeam {...params} closeModal={closeModal} />}
          {modal === "CreateOrganization" && <CreateOrganization {...params} closeModal={closeModal} />}
          {modal === "EditOrganization" && <EditOrganization {...params} closeModal={closeModal} />}
          {modal === "GithubProjects" && <GithubProjects {...params} closeModal={closeModal} />}
          {modal === "GithubColumns" && <GithubColumns {...params} closeModal={closeModal} />}
          {modal === "Invite" && <Invite {...params} closeModal={closeModal} />}
          {modal === "Confirm" && <Confirm {...params} closeModal={closeModal} />}
          {modal === "ManageTeamMembers" && <ManageTeamMembers {...params} closeModal={closeModal} />}
          {modal === "AssignTask" && <AssignTask {...params} closeModal={closeModal} />}
          {modal === "Stripe" && <Stripe {...params} closeModal={closeModal} />}
          {modal === "Snooze" && <Snooze {...params} closeModal={closeModal} />}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Modal;
