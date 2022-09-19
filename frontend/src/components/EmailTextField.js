import { TextField } from "@mui/material";

const EmailTextField = ({ setEmail }) => {
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <TextField
      className="outlined-basic"
      label="Email"
      variant="outlined"
      id="test"
      onChange={handleChange}
    />
  );
};

export default EmailTextField;
