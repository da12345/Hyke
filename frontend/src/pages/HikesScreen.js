import { Box, CircularProgress } from "@mui/material";
import { collection, getDocs, query, Timestamp, where, updateDoc, doc} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import StackGrid from "react-stack-grid";

import EventCard from "../components/events/EventCard";
import { auth, db } from "../config/firebase";

export default function HikesScreen() {
  const [user, loading] = useAuthState(auth);
  const [loadingHykeData, setLoadingHykeData] = useState(true);
  const [hykeData, setHykeData] = useState([]);
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
  const [stackGrid, setStackGrid] = useState();

  const [searchContent, setSearchContent] = useState(" ");

  const fetchHykes = async () => {
    const temp_st = searchContent.split(" ");
    let search_content_tags = [];
    for (let i = 0; i < temp_st.length; i++) {
      if (temp_st[i] !== "") {
        search_content_tags.push(temp_st[i].toLowerCase());
      }
    }

    let hykeData = [];
    try {
      let q;
      if (
        search_content_tags === undefined ||
        search_content_tags.length === 0
      ) {
        q = query(collection(db, "hykes"));
      } else {
        q = query(
          collection(db, "hykes"),
          where("search_tags", "array-contains-any", search_content_tags)
        );
      }

      const docs = await getDocs(q);

      docs.forEach((d) => {
        if (d.data().date.valueOf() > Timestamp.now().valueOf()) {
          hykeData.push({ id: d.id, data: d.data() });
        }
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
      return;
    }
    setLoadingHykeData(false);
    setHykeData(hykeData);
    console.error(hykeData);
    if (stackGrid) {
      stackGrid.updateLayout();
    }
  };

  const [admin, setAdmin] = useState(false);
  const [commercial, setCommercial] = useState(false);
  const [userData, setUserData] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(true);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setAdmin(data.admin);
      setCommercial(data.commercial);
      setUserData(data);
      setLoadingUserData(false);
      console.log(data);
    } catch (err) {
      console.error(err);
      setLoadingUserData(false);
    }
  };

  window.processData = function (data) {
    setSearchContent(data);
    fetchHykes();
  };

  useEffect(() => {
    if (loading) return;
    fetchHykes();
    fetchUserName();
  }, [user, loading, searchContent]);

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
      {loadingHykeData ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: 22 }}
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
          {hykeData.map((item, n) => (
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
          ))}
        </StackGrid>
      )}
    </div>
  );
}
