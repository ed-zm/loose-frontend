import React from "react";
import Button from "../../Button";
import "./index.scss";

const Confirm = ({ onOK, onOKText = "Ok", onCancel, description = "", onCancelText = "Cancel", closeModal }) => {
  return (
    <div className="confirm">
      <p>{description}</p>
      <div className="confirm-buttons">
        <Button className="github-repos-modal-button" onClick={onOK}>
          {onOKText}
        </Button>
        <Button className="github-repos-modal-button" onClick={closeModal}>
          {onCancelText}
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
