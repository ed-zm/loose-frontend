import React, { useContext } from "react";
import classNames from "classnames";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import useOrganization from "loose-components/src/screens/Dashboard/Organization";
import GithubLogin from "react-github-login";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import { UserContext } from "loose-components/src/contexts/User";
import GithubButton from "../../../components/GithubButton";
import Button from "../../../components/Button";
import List from "../../../components/List";
import RepositoryCard from "../../../components/RepositoryCard";
import "./index.scss";
import Loading from "../../../components/Loading";
import ProjectCard from "../../../components/ProjectCard";
import TasksList from "../../../components/Lists/Tasks";
import TeamsList from "../../../components/Lists/Teams";
import UsersList from "../../../components/Lists/Users";

const Organization = ({ env }) => {
  const router = useRouter();
  const { id } = router.query;
  const { actions } = useContext(ModalContext);
  const user = useContext(UserContext);
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
    onDeleteOrganization,
    onInviteToOrganization,
    invitingToOrganization,
  } = useOrganization({ id });
  if (!organization) return null;
  return (
    <div className="organization">
      <div className="organization-profile pagehead orghead">
        <div className="organization-profile-info">
          <img src="/default_profile.png" className="avatar organization-profile-avatar" />
          <span className="organization-profile-name-text">{organization.name}</span>
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
        </div>
        {organization.owner.id === user.id && (
          <div className="organization-profile-buttons">
            <Button
              onClick={() => {
                actions.openModal({ modal: "EditOrganization", title: "Edit Organization", params: { organization } });
              }}
            >
              Edit
            </Button>
            <Button
              deleteButton
              onClick={() => {
                actions.openModal({
                  modal: "Confirm",
                  title: "Delete Organization",
                  params: {
                    onOKText: "Delete",
                    onOK: async () => {
                      await onDeleteOrganization();
                      await router.push("/dashboard/organizations");
                    },
                    description: "Are you sure to delete this organization?",
                  },
                });
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                actions.openModal({
                  modal: "Invite",
                  title: "Invite To Organization",
                  params: {
                    organization,
                    onInvite: async (id) => {
                      await onInviteToOrganization(id);
                    },
                    type: "ORGANIZATION",
                    typeId: organization.id,
                  },
                });
              }}
            >
              Invite
            </Button>
          </div>
        )}
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
            <a
              onClick={() => {
                setTab("TASKS");
              }}
              className="UnderlineNav-item"
              aria-current={tab === "TASKS"}
            >
              <span>Tasks</span>
            </a>
            <a
              onClick={() => {
                setTab("TEAMS");
              }}
              className="UnderlineNav-item"
              aria-current={tab === "TEAMS"}
            >
              <span>Teams</span>
            </a>
            <a
              onClick={() => {
                setTab("MEMBERS");
              }}
              className="UnderlineNav-item"
              aria-current={tab === "MEMBERS"}
            >
              <span>Members</span>
            </a>
          </div>
        </nav>
        {loadingRepositories || loadingProjects ? (
          <Loading />
        ) : (
          <div className="organization-content-render">
            {tab === "REPOSITORIES" && (
              <div className="organization-content-render-child">
                {loadingRepositories ? (
                  <ClipLoader size={20} color={"333333"} loading={true} />
                ) : (
                  <List
                    items={repositories}
                    renderItem={(repository) => <RepositoryCard repo={repository} organization={organization} />}
                  />
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
              <div className="organization-content-render-child">
                {loadingProjects ? (
                  <ClipLoader size={20} color={"333333"} loading={true} />
                ) : (
                  <List items={projects} renderItem={(project) => <ProjectCard project={project} />} />
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
            {tab === "TASKS" && <TasksList organization={organization} />}
            {tab === "TEAMS" && <TeamsList organization={organization} />}
            {tab === "MEMBERS" && <UsersList organization={organization} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Organization;
