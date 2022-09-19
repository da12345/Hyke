import { ToggleButton } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";

const JoinEventButton = () => {
  const [selected, setSelected] = React.useState(false);

  return (
    <div>
      <p> Click here to join Hyke </p>
      <ToggleButton
        value="check"
        selected={selected}
        color="success"
        onChange={() => {
          setSelected(!selected);
        }}
      >
        <CheckIcon />
      </ToggleButton>
    </div>
  );
};

export default JoinEventButton;
