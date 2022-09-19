import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//import InputAdornment from '@mui/material/InputAdornment';

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

export default function BasicSelect({ setDifficulty }) {
  const handleChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <Box style={{ width: "267px" }}>
      <FormControl style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Difficulty"
          onChange={handleChange}
          defaultValue={1}
          // Potential way to show icon in select
          IconComponent={() => <DirectionsRunIcon />}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
