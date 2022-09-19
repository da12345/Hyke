import * as React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ setTitle }) {
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onChange={handleChange}
    >
      <TextField id="standard-basic" label="Headline *" variant="standard" />
    </Box>
  );
}
