import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, registerCommercialUserWithEmailAndPassword } from "../config/firebase";

import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import UsernameTextField from "../components/UsernameTextField";
import PasswordTextField from "../components/PasswordTextField";
import EmailTextField from "../components/EmailTextField";
import FirstNameTextField from "../components/FirstNameTextField";
import LastNameTextField from "../components/LastNameTextField";
import ConfirmPasswordTextField from "../components/ConfirmPasswordTextField";
import NameTextField from "../components/NameTextField";
import CompanyNrTextField from "../components/CompanyNrTextField";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';

const RegisterUserScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const [commercialUserChecked, setCommercialUserChecked] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyNrName, setCompanyNrName] = useState("");


  const navigate = useNavigate();

  const register = () => {

    if(commercialUserChecked){
      registerCommercialUserWithEmailAndPassword(companyName, companyNrName, email, password);
    }else{
      if (!name) alert("Please enter name");
      registerWithEmailAndPassword(firstName, lastName, name, email, password);
    }

  };


  useEffect(() => {
    if (user) return navigate("/");
  }, [user]);

  return (
    <div style={{ paddingTop: "50px" }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <h1>Create an account</h1>


        <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <ListItem>
        <ListItemText id="switch-list-label-wifi" primary="Commercial user" />
        <Switch
          edge="end"
          onChange={()=>setCommercialUserChecked(!commercialUserChecked)}
          checked={commercialUserChecked}
          inputProps={{
            'aria-labelledby': 'switch-list-label-wifi',
          }}
        />
      </ListItem>
    </List>
        {commercialUserChecked ?
          <Fragment>
            {/* Org nr*/}
            <NameTextField setName={setCompanyName} />
            <CompanyNrTextField setCompanyNr={setCompanyNrName} />
            <EmailTextField setEmail={setEmail} />
            <PasswordTextField setPassword={setPassword} />
            <ConfirmPasswordTextField setConfirmPassword={setConfirmPassword} />
          </Fragment>
          :
          <Fragment>
            <FirstNameTextField setFirstName={setFirstName} />
            <LastNameTextField setLastName={setLastName} />
            <UsernameTextField setUsername={setUsername} />
            <EmailTextField setEmail={setEmail} />
            <PasswordTextField setPassword={setPassword} />
            <ConfirmPasswordTextField setConfirmPassword={setConfirmPassword} />
          </Fragment>
        }

        <div style={{ paddingTop: "50px" }}>
          <Button variant="contained" onClick={register}>
            Sign Up
          </Button>
        </div>
        <Link to="/login">Already registered?</Link>
      </Stack>
      <br />
      <br />
    </div>
  );
};

export default RegisterUserScreen;
