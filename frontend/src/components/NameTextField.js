import { TextField } from "@mui/material";

const NameTextField = ({ setName }) => {
  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <TextField
      className="outlined-basic"
      label="Company Name"
      variant="outlined"
      id="test"
      onChange={handleChange}
    />
  );
};

export default NameTextField;
