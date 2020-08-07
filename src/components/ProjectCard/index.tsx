import React from "react";
import moment from "moment";
import "./index.scss";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-card-profile">
        <div className="project-card-profile-name">
          <a className="project-card-profile-names-name mb-1">{project.name}&nbsp;</a>
          <span className="Label Label--outline" title="Label: private">
            private
          </span>
        </div>
        <div className="project-card-profile-updated">
          <svg
            className="octicon octicon-clock"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.471.696l2.5 1a.75.75 0 00.557-1.392L8.5 7.742V4.75z"
            ></path>
          </svg>
          <span>updated at {moment(project.updatedAt).fromNow()}</span>
        </div>
        <div>
          <span className="Progress mt-1">
            <span className="Progress-item bg-green" style={{ width: "50%" }}></span>
            <span className="Progress-item bg-purple" style={{ width: "30%" }}></span>
          </span>
        </div>
      </div>
      <p>description</p>
    </div>
  );
};

export default ProjectCard;
