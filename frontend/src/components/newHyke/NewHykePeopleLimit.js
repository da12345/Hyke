import * as React from "react";
import PeopleIcon from "@mui/icons-material/People";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ setAvailability }) {
  const handleChange = (e) => {
    setAvailability(e.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="Maximum number of participants"
        variant="standard"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PeopleIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
