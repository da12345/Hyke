import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AppContext } from "./utils/appContext";
import { auth } from "./config/firebase";

import LoginScreen from "./pages/LoginScreen";
import RegisterUserScreen from "./pages/RegisterUserScreen";
import NewHyke from "./pages/NewHykeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import UserSearchScreen from "./pages/UserSearchScreen";
import HikesScreen from "./pages/HikesScreen";
import MyHykes from "./pages/MyHykes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [userState, setUserState] = useState(false);

  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      console.log("loading");
    }
    if (!user) {
      console.log("log inn");
    }
    if (user) {
      //      console.log(user);
    }
  }, [user, loading]);

  return (
    <AppContext.Provider
      value={{ accessToken, setAccessToken, userState, setUserState }}
    >
      <div className="app">
        <Router>
          <Navigationbar />
          <Routes>
            <Route path="/navigationbar" element={<Navigationbar />} />
            <Route path="/newhyke" element={<NewHyke />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/" element={<HikesScreen />} />
            <Route path="/register" element={<RegisterUserScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/myhykes" element={<MyHykes />} />
            <Route path="/usersearch" element={<UserSearchScreen />} />
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
