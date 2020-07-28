import React, { useContext } from "react";
import classNames from "classnames";
import useTasks from "loose-components/src/screens/Dashboard/Tasks";
import TaskCard from "../../../components/TaskCard";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import "./index.scss";
import Select, { Option } from "../../../components/Select";

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
    onSetCursor,
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
        {tasks.map((task) => (
          <li className="tasks-list-item Box-body" key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
      {!!tasks.length && (
        <div className="pagination">
          <a
            // className="previous_page"
            onClick={() => onSetCursor("BEFORE")}
            aria-disabled={loading || !pageInfo.hasPreviousPage}
          >
            Previous
          </a>
          {/* <em aria-current="page">1</em>
        <a href="#url" aria-label="Page 2">
          2
        </a>
        <a href="#url" aria-label="Page 3">
          3
        </a> */}
          <a
            onClick={() => onSetCursor("AFTER")}
            // className="next_page"
            // rel="next"
            // href="#url"
            // aria-label="Next Page"
            aria-disabled={loading || !pageInfo.hasNextPage}
          >
            Next
          </a>
        </div>
      )}
    </div>
  );
};

export default Tasks;
