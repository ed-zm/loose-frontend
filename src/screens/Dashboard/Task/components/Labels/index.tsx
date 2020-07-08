import React from "react";
import useTaskLabels from "loose-components/src/screens/Dashboard/Task/components/Labels";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import "./index.scss";

const Labels = ({ task }) => {
  const { onAddLabel, data, label, setLabel, creatingLabel, organizationId } = useTaskLabels({ task });
  return (
    <div>
      {data &&
        data.labels &&
        data.labels.map((label) => (
          // Label Name is conformed by ${label}-${organizationId} to make it unique per organization and keep the index in DB
          <span
            className="Label Label--large Label--gray-darker"
            title={`Label: ${label.text.split("-")[0]}`}
            key={label.id}
          >
            {label.text.split("-")[0]}{" "}
          </span>
        ))}
      {organizationId && <Input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />}
      {organizationId && (
        <Button onClick={onAddLabel} disabled={creatingLabel}>
          add label
        </Button>
      )}
    </div>
  );
};

export default Labels;
