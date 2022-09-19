import { TextField } from "@mui/material";

const FirstNameTextField = ({ setFirstName }) => {
  const handleChange = (e) => {
    setFirstName(e.target.value);
  };

  return (
    <TextField
      className="outlined-basic"
      label="First Name"
      variant="outlined"
      id="test"
      onChange={handleChange}
    />
  );
};

export default FirstNameTextField;
