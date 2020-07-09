import React, { useContext } from "react";
import classNames from "classnames";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import useOrganization from "loose-components/src/screens/Dashboard/Organization";
import GithubLogin from "react-github-login";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import GithubButton from "../../../components/GithubButton";
import List from "../../../components/List";
import RepositoryCard from "../../../components/RepositoryCard";
import "./index.scss";
import Loading from "../../../components/Loading";

const Organization = ({ env }) => {
  const router = useRouter();
  const { id } = router.query;
  const { actions } = useContext(ModalContext);
  const {
    organization,
    loading,
    error,
    projects,
    loadingProjects,
    projectsError,
    repositories,
    loadingRepositories,
    repositoriesError,
    onSuccess,
    onError,
    tab,
    setTab,
    onUnlinkOrganization,
  } = useOrganization({ id });
  if (!organization) return null;
  return (
    <div className="organization">
      <div className="organization-profile">
        <img src="/default_profile.png" className="organization-profile-avatar" />
        <span className="organization-profile-name-text">{organization.name.toUpperCase()}</span>
        <GithubLogin
          clientId={env.GITHUB_CLIENT_ID}
          onSuccess={onSuccess}
          onError={onError}
          redirectUri={`${env.HOST}/oauth`}
          scope="repo read:user read:org"
        >
          <GithubButton>{organization.githubOrganization ? organization.githubOrganization : "Connect"}</GithubButton>
        </GithubLogin>
        {organization.githubOrganization && <a onClick={onUnlinkOrganization}>Disconnect</a>}
        <p className="organization-profile-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>
        <div>
          <span className="h4">Teams</span>
          <br />
          {["", ""].map((team) => (
            <img className="avatar avatar-small" src={"/default_profile.png"} width="32" height="32" />
          ))}
        </div>
        <div>
          <span className="h4">Users</span>
          <br />
          {["", ""].map((team) => (
            <img className="avatar avatar-small" src={"/default_profile.png"} width="32" height="32" />
          ))}
        </div>
      </div>
      <div className="organization-content">
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
        {loadingRepositories || loadingProjects ? (
          <Loading />
        ) : (
          <React.Fragment>
            {tab === "REPOSITORIES" && (
              <div>
                {loadingRepositories ? (
                  <ClipLoader size={20} color={"333333"} loading={true} />
                ) : (
                  <ul className="Box">
                    <li className="teams-list-item Box-header">
                      <h3 className="Box-title">Filters</h3>
                    </li>
                    {repositories &&
                      repositories.map((repo) => (
                        <li className="organization-repository-list-item Box-body">
                          <RepositoryCard repo={repo} importButton organization={organization} />
                        </li>
                      ))}
                  </ul>
                )}

                {repositories && (
                  <GithubButton
                    onClick={async () => {
                      await actions.openModal({
                        modal: "GithubRepos",
                        params: { repos: repositories, organization },
                        title: "Repositories",
                      });
                    }}
                  >
                    Import Issues
                  </GithubButton>
                )}
              </div>
            )}
            {tab === "PROJECTS" && (
              <div>
                {loadingProjects ? (
                  <ClipLoader size={20} color={"333333"} loading={true} />
                ) : (
                  <List items={projects} renderItem={(project) => <li>{project.name}</li>} />
                )}

                {repositories && (
                  <GithubButton
                    onClick={async () => {
                      await actions.openModal({
                        modal: "GithubProjects",
                        params: { organization, projects },
                        title: "Projects",
                      });
                    }}
                  >
                    Import Cards
                  </GithubButton>
                )}
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Organization;
