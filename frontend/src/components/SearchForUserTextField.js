import { TextField } from "@mui/material";
import React from "react";

const SearchForUserTextField = ({ setUserSearch }) => {
  const handleChange = (e) => {
    setUserSearch(e.target.value);
  };

  return (
    <TextField
      className="outlined-basic"
      label="Search user"
      variant="outlined"
      onChange={handleChange}
    />
  );
};

export default SearchForUserTextField;
