import { TextField } from "@mui/material";

const CompanyNrTextField = ({ setCompanyNr }) => {
  const handleChange = (e) => {
    setCompanyNr(e.target.value);
  };

  return (
    <TextField
      className="outlined-basic"
      label="Company Number"
      variant="outlined"
      id="test"
      onChange={handleChange}
    />
  );
};

export default CompanyNrTextField;
