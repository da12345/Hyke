import RouteIcon from "@mui/icons-material/Route";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ setDistance }) {
  const handleChange = (e) => {
    setDistance(e.target.value);
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
        label="Distance"
        variant="standard"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RouteIcon />
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position="end">Km</InputAdornment>,
        }}
      />
    </Box>
  );
}
