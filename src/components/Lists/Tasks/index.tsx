import React, { useContext } from "react";
import TaskCard from "../../TaskCard";
import List from "../../List";
import Select, { Option } from "../../Select";
import Button from "../../Button";
import useTasksList from "loose-components/src/components/Lists/Tasks";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import Input from "../../Input";
import "./index.scss";

const Tasks = ({ team, organization }) => {
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
    orderBy,
    setOrderBy,
    onFetchMore,
    pageInfo,
    loading,
  } = useTasksList({ team, organization });
  const modal = useContext(ModalContext);
  return (
    <div className="task-list">
      <div className="tasks-list-header">
        <Input placeholder="Title" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value.toLowerCase())} />
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
        <Select onChange={(e) => setOrderBy(e.target.value)} value={orderBy}>
          <Option value="createdAt_DESC">Newest</Option>
          <Option value="createdAt_ASC">Oldest</Option>
        </Select>
        <Button
          className="tasks-list-header-button"
          onClick={() => {
            modal.actions.openModal({ modal: "CreateTask", title: "Add Task", params: { tasks, variables } });
          }}
        >
          Add Task
        </Button>
      </div>
      <List
        loading={loading}
        pageInfo={pageInfo}
        onFetchMore={onFetchMore}
        items={tasks}
        renderItem={(task) => <TaskCard task={task} />}
      />
    </div>
  );
};

export default Tasks;
