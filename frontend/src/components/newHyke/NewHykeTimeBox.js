import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import PeopleIcon from "@mui/icons-material/People";
import InputAdornment from "@mui/material/InputAdornment";

export default function NewHykeTimeBox({ setDate }) {
  const [value, setValue] = React.useState(null);

  const handleChange = (newValue) => {
    setDate(newValue);
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => (
          <TextField
            style={{ width: "100%", maxWidth: "252px" }}
            variant="standard"
            {...props}
          />
        )}
        label="Time"
        ampm={false}
        value={value}
        onChange={(newValue) => {
          handleChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
