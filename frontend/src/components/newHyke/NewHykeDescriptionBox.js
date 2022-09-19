import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { TextField } from "@mui/material";

export default function MinHeightTextarea({ setDescription }) {
  const handleChange = (e) => {
    setDescription(e.target.value);
  };
  return (
    <TextField
      placeholder="Add description"
      style={{ width: "100%", maxWidth: "252px" }}
      variant="standard"
      id="outlined-multiline-flexible"
      label="Add description"
      multiline
      maxRows={8}
      onChange={handleChange}
    />
  );
}
