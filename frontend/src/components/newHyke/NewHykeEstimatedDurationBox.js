import * as React from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ setDuration }) {
  const handleChange = (e) => {
    setDuration(e.target.value);
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
        label="Estimated duration"
        variant="standard"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HourglassBottomIcon />
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position="end">h</InputAdornment>,
        }}
      />
    </Box>
  );
}
