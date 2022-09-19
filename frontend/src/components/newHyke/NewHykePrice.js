import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Icon } from "@mui/material";

export default function BasicTextFields({ setPrice }) {
  const handleChange = (e) => {
    setPrice(e.target.value);
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
        label="Price"
        variant="standard"
        onChange={handleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">NOK</InputAdornment>,
        }}
      />
    </Box>
  );
}
