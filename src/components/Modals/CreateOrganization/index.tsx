import React from "react";

const CreateOrganization = () => {
  return (
    <div>
      <div>
        <input type="text" placeholder="organization name" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={onCreateOrganization}> Create Organization </button>
      </div>
      <div className="js-check-all-container">
        <div className="subnav org-toolbar org-toolbar-next">
          <div className="subnav-search float-left">
            <div className="auto-search-group">
              <Input className="subnav-search-input input-contrast auto-search-input js-team-search-field" />
            </div>
          </div>
          <div className="float-right">
            <Button
              onClick={() => {
                modal.actions.openModal({ modal: "CreateTask", title: "Add Task", params: { organizations } });
              }}
            >
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganization;
