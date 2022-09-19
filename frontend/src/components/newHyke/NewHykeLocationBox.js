import EditLocationIcon from "@mui/icons-material/EditLocation";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ setLocation }) {
  const handleChange = (e) => {
    setLocation(e.target.value);
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
        label="Location"
        variant="standard"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EditLocationIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
