import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";
import useTasks from "loose-components/src/screens/Dashboard/Tasks";
import TaskCard from "../../../components/TaskCard";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";
import Select, { Option } from "../../../components/Select";
import Loading from "../../../components/Loading";

const Tasks = () => {
  const modal = useContext(ModalContext);
  const {
    tasks,
    state,
    variables,
    setState,
    createdOrAssigned,
    setCreatedOrAssigned,
    organizationOrPersonal,
    setOrganizationOrPersonal,
    setTitleFilter,
    titleFilter,
    // page,
    // setPage,
    onFetchMore,
    pageInfo,
    loading,
  } = useTasks();
  return (
    <div className="tasks">
      <div className="tasks-create-button">
        <Input placeholder="Title" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
        <Select onChange={(e) => setState(parseInt(e.target.value, 10))} value={state}>
          <Option value={2}>All</Option>
          <Option value={0}>Open</Option>
          <Option value={1}>Closed</Option>
        </Select>
        <Select onChange={(e) => setCreatedOrAssigned(e.target.value)} value={createdOrAssigned}>
          <Option value={null}>All</Option>
          <Option value="CREATED">Created By Me</Option>
          <Option value="ASSIGNED">Assigned To Me</Option>
        </Select>
        <Select onChange={(e) => setOrganizationOrPersonal(e.target.value)} value={organizationOrPersonal}>
          <Option value={null}>All</Option>
          <Option value="PERSONAL">Personal</Option>
        </Select>
        <Button
          onClick={() => {
            modal.actions.openModal({ modal: "CreateTask", title: "Add Task", params: { tasks, variables } });
          }}
        >
          Add Task
        </Button>
      </div>
      <ul className="Box tasks-list">
        <div className="Box-header d-flex flex-justify-between"></div>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            loading || !pageInfo.hasNextPage ? null : onFetchMore();
          }}
          hasMore={pageInfo.hasNextPage}
          loader={<Loading />}
          useWindow={false}
        >
          {tasks.map((task) => (
            <li className="tasks-list-item Box-body" key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
};

export default Tasks;
