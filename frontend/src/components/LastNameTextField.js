import { TextField } from "@mui/material";

const LastNameTextField = ({ setLastName }) => {
  const handleChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <TextField
      className="outlined-basic"
      label="Last Name"
      variant="outlined"
      id="test"
      onChange={handleChange}
    />
  );
};

export default LastNameTextField;
