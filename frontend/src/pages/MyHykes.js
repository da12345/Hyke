import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { query, collection, getDocs } from "firebase/firestore";
import EventCard from "../components/events/EventCard";
import StackGrid from "react-stack-grid";
import { Grid, Box, CircularProgress } from "@mui/material";
import Divider from "@mui/material/Divider";

const MyHykes = () => {
  const [user, loading] = useAuthState(auth);
  const [loadingHykeData, setLoadingHykeData] = useState(true);

  const [pastHykeData, setPastHykeData] = useState([]);
  const [futureHykeData, setFutureHykeData] = useState([]);

  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
  const [stackGrid, setStackGrid] = useState();

  const fetchUpcomingHykes = async () => {
    try {
      const q = query(collection(db, "hykes"));
      const doc = await getDocs(q);

      doc.forEach((d) => {
        var hykedate = d.data().date.seconds;
        var currentdate = Math.round(new Date().getTime() / 1000);

        for (let i = 0; i < d.data().participants.length; i++) {
          if (d.data().participants[i].email === user.email) {
            if (hykedate > currentdate) {
              futureHykeData.push({ id: d.id, data: d.data() });
            } else {
              pastHykeData.push({ id: d.id, data: d.data() });
            }
          }
        }
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
      return;
    }
    setLoadingHykeData(false);
    setFutureHykeData(futureHykeData);
    setPastHykeData(pastHykeData);
    if (stackGrid) {
      stackGrid.updateLayout();
    }
  };

  const [admin] = useState(false);
  const [userData] = useState(false);
  const [loadingUserData] = useState(true);

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

  useEffect(() => {
    const handleResize = () => {
      setWindowsWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });

  const calc_card_width = () => {
    if (windowsWidth < 515) {
      return "100%";
    } else if (windowsWidth < 960) {
      return "45%";
    }
    return "55%";
  };

  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: "1200px",
        minWidth: "1200px",
        marginTop: "6px",
      }}
    >
      <Grid container>
        <Grid id="pasthykes" item xs>
          <h2>Future Hykes</h2>
          {loadingHykeData ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 22,
                }}
              />
            </Box>
          ) : (
            <StackGrid
              gridRef={(grid) => setStackGrid(grid)}
              columnWidth={calc_card_width()}
              duration={320}
              gutterWidth={0}
              gutterHeight={0}
              appearDelay={0}
            >
              {futureHykeData.map((item, n) => (
                <EventCard
                  n={n}
                  key={item.id}
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
                  rating={item.data.rating}
                  admin={admin}
                  refresh={fetchUpcomingHykes}
                />
              ))}
            </StackGrid>
          )}
        </Grid>

        <Divider orientation="vertical" flexItem></Divider>

        <Grid padding="10px" id="futurehykes" item xs>
          <h2>Past Hykes</h2>
          {loadingHykeData ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 220,
                }}
              />
            </Box>
          ) : (
            <StackGrid
              gridRef={(grid) => setStackGrid(grid)}
              columnWidth={calc_card_width()}
              duration={320}
              gutterWidth={0}
              gutterHeight={0}
              appearDelay={0}
            >
              {pastHykeData.map((item, n) => (
                <EventCard
                  n={n}
                  key={item.id}
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
                  rating={item.data.rating}
                  admin={admin}
                  refresh={fetchUpcomingHykes}
                />
              ))}
            </StackGrid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MyHykes;

/*
        <Grid container spacing={2} columns={12}>
          {hykeData.map((item) => {
            return (
              //TODO: IKKE BRUK DESCIPTION SOM KEY
              <Grid item xs={12} sm={6} md={3} key={item.description}>
                <EventCard id={item.id} title={item.data.title} distance={item.data.distance} location={item.data.location} difficulty={item.data.difficulty} duration={item.data.duration} date={item.data.date} availability={item.data.availability} description={item.data.description} photo_url={""} data={item.data} />
              </Grid>
            );
          })}
        </Grid>
        */
