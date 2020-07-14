import React from "react";
import Button from "../../Button";

const Confirm = ({ onOK, onOKText = "Ok", onCancel, description = "", onCancelText = "Cancel", closeModal }) => {
  return (
    <div>
      <p>{description}</p>
      <Button className="github-repos-modal-button" onClick={onOK}>
        {onOKText}
      </Button>
      <Button className="github-repos-modal-button" onClick={closeModal}>
        {onCancelText}
      </Button>
    </div>
  );
};

export default Confirm;
