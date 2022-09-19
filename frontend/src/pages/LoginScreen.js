import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import EmailTextField from "../components/EmailTextField";
import PasswordTextField from "../components/PasswordTextField";

import { auth, logInWithEmailAndPassword } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginScreen = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate("/");
  }, [user]);

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ paddingTop: "150px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <h1>Log in</h1>
          <EmailTextField setEmail={setMail} />
          <PasswordTextField setPassword={setPassword} />

          <div style={{ paddingTop: "50px" }}>
            <Button
              variant="contained"
              onClick={() => logInWithEmailAndPassword(mail, password)}
            >
              Log in
            </Button>
          </div>

          <Link to="/register">Not registered? Create account</Link>
        </Stack>
      </div>
    </div>
  );
};

export default LoginScreen;
