import { TextField } from "@mui/material";

const ConfirmPasswordTextField = ({ setConfirmPassword }) => {
  const handleChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <TextField
      className="outlined-basic"
      label="Confirm Password"
      variant="outlined"
      type={"password"}
      onChange={handleChange}
    />
  );
};

export default ConfirmPasswordTextField;
