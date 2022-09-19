import { TextField } from "@mui/material";

const UsernameTextField = ({ setUsername }) => {
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <TextField
      className="outlined-basic"
      label="Username"
      variant="outlined"
      id="test"
      onChange={handleChange}
    />
  );
};

export default UsernameTextField;
