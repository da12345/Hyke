import { TextField } from "@mui/material";

const PasswordTextField = ({ setPassword }) => {
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <TextField
      className="outlined-basic"
      label="Password"
      variant="outlined"
      type={"password"}
      onChange={handleChange}
    />
  );
};

export default PasswordTextField;
