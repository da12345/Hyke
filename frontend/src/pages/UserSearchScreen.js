import { Avatar, Button, Grid, Stack, TextField } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import SearchForUserTextField from "../components/SearchForUserTextField";
import { auth, db } from "../config/firebase";
import StackGrid from "react-stack-grid";
import EventCard from "../components/events/EventCard";

const UserSearchScreen = () => {
  const [user, loading] = useAuthState(auth);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [activeUser, setActiveUser] = useState(false);
  const [stackGrid, setStackGrid] = useState();
  const navigate = useNavigate();
  const [loadingHykeData, setLoadingHykeData] = useState(true);
  const [hykeData, setHykeData] = useState([]);
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
  const [admin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [loadingUserData] = useState(true);

  const searchUser = async () => {
    setActiveUser(false);

    const temp_st = userSearch.split(" ");
    let search_name_tags = [];
    for (let i = 0; i < temp_st.length; i++) {
      if (temp_st[i] !== "") {
        search_name_tags.push(temp_st[i].toLowerCase());
      }
    }

    try {
      let q;
      if (search_name_tags === undefined || search_name_tags.length === 0) {
        q = query(collection(db, "users"));
      } else {
        q = query(
          collection(db, "users"),
          where("search_tags", "array-contains-any", search_name_tags)
        );
      }

      const doc = await getDocs(q);

      doc.forEach((d) => {
        setActiveUser(true);
        setFirstname(d.data().firstName);
        setLastname(d.data().lastName);
        setEmail(d.data().email);
        setUsername(d.data().username);
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

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
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);

  useEffect(() => {
    setActiveUser(false);
  }, [userSearch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowsWidth(window.innerWidth);
      calc_card_width();
    };
    if (stackGrid) {
      stackGrid.updateLayout();
    }
    window.addEventListener("resize", handleResize);
  });

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
    <div>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <h1> Search User </h1>
        <SearchForUserTextField setUserSearch={setUserSearch} />
        <Button
          variant="contained"
          onClick={searchUser}
          onMouseDown={fetchHykes}
        >
          Search
        </Button>
        {activeUser ? (
          <>
            {" "}
            <div style={{ width: "70%", margin: "auto", paddingTop: "100px" }}>
              <Grid container spacing={4} columns={12} rowSpacing={10}>
                <Grid item sm={12} md={6}>
                  <Avatar
                    alt="Profile Picture"
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    sx={{ width: 200, height: 200 }}
                    style={{ marginLeft: "auto", marginRight: "75px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Stack spacing={0.1}>
                    <p style={{ fontSize: "28px" }}>
                      {" "}
                      <b>
                        {firstname} {lastname} {"("} {username} {")"}
                      </b>
                    </p>
                    <p>{email}</p>
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </>
        ) : (
          <h2> No user with that name</h2>
        )}
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginTop: 75 }}
      >
        {activeUser ? <h1>{firstname}'s Hykes</h1> : <></>}
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
            {item.data.created_by.firstName === userSearch &&
            activeUser === true ? (
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
                comments={item.data.comments}
                admin={admin}
              />
            ) : (
              <> </>
            )}
          </>
        ))}
      </StackGrid>
    </div>
  );
};

export default UserSearchScreen;
