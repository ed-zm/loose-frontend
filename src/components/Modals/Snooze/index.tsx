import React, { useState } from "react";
import Select, { Option } from "../../Select";
import Button from "../../Button";

const Snooze = ({ task, onSnooze, closeModal }) => {
  const [snoozeTill, setSnoozeTill] = useState(1);
  return (
    <div>
      <Select
        onChange={(e) => {
          setSnoozeTill(e.target.value);
        }}
        value={snoozeTill}
      >
        <Option value={1}>1 Hour</Option>
        <Option value={24}>1 Day</Option>
        <Option value="LOW">Low Priority</Option>
        <Option value="MEDIUM">Medium Priority</Option>
      </Select>
      <Button
        onClick={async () => {
          await onSnooze({ snoozeTill, task });
          await closeModal();
        }}
      >
        Snooze
      </Button>
    </div>
  );
};

export default Snooze;
