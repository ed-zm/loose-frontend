import React, { useContext } from "react";
import moment from "moment";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import GithubButton from "../GithubButton";
import "./index.scss";

const RepositoryCard = ({ repo, importButton, organization }) => {
  const { actions } = useContext(ModalContext);
  return (
    <div className="repository-card">
      <div className="repository-card-content">
        <div className="repository-card-content-title">
          <a className="repository-card-content-title-name">{repo.name}</a>
          <span className="Label Label--outline">{repo.private ? "Private" : "Public"}</span>
        </div>
        <div className="repository-card-content-metadata">
          <span className="repository-card-content-metadata-key">{repo.language}</span>
          <div>
            <span className="repository-card-content-metadata-key">Open </span>
            <span className="repository-card-content-metadata-value">{repo.openIssuesCount}</span>
          </div>
          <span className="">Updated at &nbsp;{moment(repo.updatedAt).fromNow()}</span>
          {/* <div>
            <span className = 'repository-card-content-metadata-key'>Stars:{' '}</span>
            <span className = 'repository-card-content-metadata-value'>{repo.stargazersCount}</span>
          </div>
          <div>
            <span className = 'repository-card-content-metadata-key'>Forks:{' '}</span>
            <span className = 'repository-card-content-metadata-value'>{repo.forksCount}</span>
          </div> */}
        </div>
      </div>
      <div className="repository-card-actions">
        {importButton && (
          <GithubButton
            onClick={async () => {
              await actions.openModal({ modal: "GithubIssues", params: { repo, organization }, title: "Issues" });
            }}
          >
            Import
          </GithubButton>
        )}
      </div>
    </div>
  );
};

export default RepositoryCard;
