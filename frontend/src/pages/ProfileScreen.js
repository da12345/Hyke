import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {
  Stack,
  Grid,
  Avatar,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";
import StackGrid from "react-stack-grid";
import EventCard from "../components/events/EventCard";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";

const ProfileScreen = () => {
  const [user, loading, error] = useAuthState(auth);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loadingHykeData, setLoadingHykeData] = useState(true);
  const [hykeData, setHykeData] = useState([]);
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
  const [stackGrid, setStackGrid] = useState();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [commercial, setCommercial] = useState(false);
  const [userData, setUserData] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(true);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setFirstname(data.firstName);
      setLastname(data.lastName);
      setEmail(data.email);
      setUsername(data.username);
      setUserData(data);
      setCommercial(data.commercial);
      setLoadingUserData(false);
    } catch (err) {
      console.error(err);
      setLoadingUserData(false);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
    fetchHykes();
  }, [user, loading]);

  useEffect(() => {
    const handleResize = () => {
      setWindowsWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 200,
        height: 200,
        fontSize: 80
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const fetchHykes = async () => {
    let hykeData = [];
    try {
      const q = query(collection(db, "hykes"));
      const doc = await getDocs(q);

      doc.forEach((d) => {
        hykeData.push({ id: d.id, data: d.data() });
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
      return;
    }
    setLoadingHykeData(false);
    setHykeData(hykeData);
    if (stackGrid) {
      stackGrid.updateLayout();
    }
  };

  const calc_card_width = () => {
    if (windowsWidth < 515) {
      return "100%";
    } else if (windowsWidth < 960) {
      return "45%";
    }
    return "30%";
  };

  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: "1200px",
        marginTop: "6px",
      }}
    >
      {loadingUserData ?
        <Box sx={{ display: "flex" }}>
          <CircularProgress
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: 22 }}
          />
        </Box>
      :
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <h1> Profile </h1>
        <div
          style={{
            width: "100%",
            margin: "auto",
            paddingTop: "40px",
          }}
        >
          <Grid container spacing={4} columns={12} rowSpacing={10}>
            <Grid item sm={12} md={6}>
              {/*
              <Avatar
                alt="Profile Picture"
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                sx={{ width: 200, height: 200 }}
                style={{ marginLeft: "auto", marginRight: "75px" }}
              />
              */}
              <Avatar
                style={{ marginLeft: "auto", marginRight: "75px" }}
                {...stringAvatar(
                  `${firstname} ${lastname}`
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Stack spacing={0.1}>
                <p style={{ fontSize: "28px" }}>
                  {" "}
                  {commercial ?
                    <b>
                    Commercial organizer
                    </b>
                  :
                    <b>
                      {firstname} {lastname} {"("} {username} {")"}
                    </b>
                  } 
                </p>
                <p>{email}</p>
                <Button
                  variant="contained"
                  onClick={logout}
                  style={{
                    marginTop: 50,
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  {" "}
                  Log out{" "}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </div>
      </Stack>
      }

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginTop: 75 }}
      >
        <h1>Your Hykes</h1>
      </Stack>

      <StackGrid
        gridRef={(grid) => setStackGrid(grid)}
        columnWidth={calc_card_width()}
        duration={320}
        gutterWidth={0}
        gutterHeight={0}
        appearDelay={0}
      >
        {hykeData.map((item, n) => (
          <>
            {item.data.created_by.username == userData.username ? (
              <EventCard
              key={n}
              n={n}
              id={item.id}
              userData={userData}
              loadingUser={loadingUserData}
              title={item.data.title}
              distance={item.data.distance}
              location={item.data.location}
              difficulty={item.data.difficulty}
              duration={item.data.duration}
              date={item.data.date}
              availability={item.data.availability}
              description={item.data.description}
              photo_url={""}
              data={item.data}
              created_by={item.data.created_by}
              participants={item.data.participants}
              price={item.data.price}
              comments={item.data.comments}
              rating={item.data.rating}
              admin={admin}
              commercial={commercial}
                refresh={fetchHykes}
              />
            ) : (
              console.log("tomt")
            )}
          </>
        ))}
      </StackGrid>
    </div>
  );
};

export default ProfileScreen;
