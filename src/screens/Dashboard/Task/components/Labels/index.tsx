import React from "react";
import useTaskLabels from "loose-components/src/screens/Dashboard/Task/components/Labels";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import "./index.scss";

const Labels = ({ task }) => {
  const {
    onAddLabel,
    labels,
    label,
    setLabel,
    creatingLabel,
    organizationId,
    add,
    setAdd,
    onRemoveLabel,
    removingLabel,
  } = useTaskLabels({ task });
  return (
    <div className="labels">
      {labels.map((label) => (
        // Label Name is conformed by ${label}-${organizationId} to make it unique per organization and keep the index in DB
        <span className="labels-label Label Label--outline" title={`Label: ${label.text.split("-")[0]}`} key={label.id}>
          {label.text.split("-")[0]}{" "}
          <svg
            onClick={() => onRemoveLabel(label.id)}
            height="16"
            width="16"
            className="octicon octicon-x d-block mx-auto labels-label-delete"
            viewBox="0 0 12 16"
            version="1.1"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"
            ></path>
          </svg>
        </span>
      ))}
      {organizationId && (
        <React.Fragment>
          {add ? (
            <Input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Escape") {
                  await setAdd(false);
                  await setLabel("");
                } else if (e.key === "Enter") {
                  await onAddLabel();
                }
              }}
              disabled={creatingLabel}
            />
          ) : (
            <span onClick={() => setAdd(true)} className="labels-label Label Label--outline">
              <svg
                height="16"
                width="16"
                className="octicon octicon-diff-added d-block mx-auto labels-label-delete"
                viewBox="0 0 14 16"
                version="1.1"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M13 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"
                ></path>
              </svg>
            </span>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Labels;
