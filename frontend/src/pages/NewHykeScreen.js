import * as React from "react";
import NewHykeHeadlineBox from "../components/newHyke/NewHykeHeadlineBox";
import { CircularProgress, Stack } from "@mui/material";
import NewHykeDescriptionBox from "../components/newHyke/NewHykeDescriptionBox";
import NewHykeTimeBox from "../components/newHyke/NewHykeTimeBox";
import NewHykePeopleLimit from "../components/newHyke/NewHykePeopleLimit";
import NewHykeEstimatedDurationBox from "../components/newHyke/NewHykeEstimatedDurationBox";
import NewHykeDistanceBox from "../components/newHyke/NewHykeDistanceBox";
import NewHykeLocation from "../components/newHyke/NewHykeLocation";
import NewHykePrice from "../components/newHyke/NewHykePrice";
import Alert from '@material-ui/lab/Alert';

import Button from "@mui/material/Button";
import NewHykeDifficulty from "../components/newHyke/NewHykeDifficulty";
import { useState, useEffect } from "react";

import { auth, db } from "../config/firebase";
import {
  Timestamp,
  query,
  collection,
  addDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box } from "@mui/system";

import { useNavigate } from "react-router-dom";

const NewHyke = () => {
  const [loadingCreateHyke, setLoadingCreateHyke] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({});
  const [date, setDate] = useState("");
  const [availability, setAvailability] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [price, setPrice] = useState(0);

  const [user, loading] = useAuthState(auth);
  const [setUserData] = useState(false);
  const [commercial, setCommercial] = useState(false);

  const navigate = useNavigate();

  const createNewHyke = () => {
    //Send data from frontend to backend here
    let new_hyke_data = {
      title: title,
      description: description,
      location: location,
      date: date,
      availability: availability,
      duration: duration,
      distance: distance,
      difficulty: difficulty,
      price: commercial ? parseInt(price) : false,
      commercial: commercial,
      participants: [],
      comments: [],
      rating: 0,
    };
    if (
      title &&
      description &&
      location &&
      date &&
      availability &&
      duration &&
      distance &&
      difficulty
    ) {
      setLoadingCreateHyke(true);
      fetchAddHykes(new_hyke_data);
    }
    else {
      //return (<Alert severity="error">Please fill out all sections!</Alert>);
    }
  };

  const fetchAddHykes = async (data) => {
    try {
      const q_u = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc_u = await getDocs(q_u);
      const data_u = doc_u.docs[0].data();

      let search_tags = [];
      if (commercial === false){
        search_tags = data.location.description
        .split(" ")
        .concat(data_u.firstName.split(" ").concat(data_u.lastName.split(" ").concat(title.split(" "))));
      }else{
        search_tags = data.location.description
        .split(" ").concat(title.split(" "));
      }
    
      for (let i = 0; i < search_tags.length; i++) {
        search_tags[i] = search_tags[i].replace(/,/, "").toLowerCase();
      }

      const q = query(collection(db, "hykes"));
      addDoc(q, {
        created_by: data_u,
        created_at: Timestamp.now(),
        title: data.title,
        description: data.description,
        location: data.location,
        date: data.date,
        availability: parseInt(data.availability),
        duration: parseInt(data.duration),
        distance: parseInt(data.distance),
        difficulty: parseInt(data.difficulty),
        participants: data.participants,
        search_tags: search_tags,
        comments: data.comments,
        rating: 0,
        price: data.price,
      });
    } catch (err) {
      setLoadingCreateHyke(false);
      alert("An error occured while creating hyke.");
      return;
    }
    navigate("/");
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setCommercial(data.commercial);
        setUserData(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading, navigate]);

  return (
    <div>
      <Stack
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <h1> Create new hyke </h1>
        <NewHykeHeadlineBox setTitle={setTitle} />
        <NewHykeDescriptionBox setDescription={setDescription} />
        <NewHykeLocation setLocation={setLocation} />
        <NewHykeTimeBox setDate={setDate} />
        <NewHykePeopleLimit setAvailability={setAvailability} />
        <NewHykeEstimatedDurationBox setDuration={setDuration} />
        <NewHykeDistanceBox setDistance={setDistance} />
        <NewHykeDifficulty setDifficulty={setDifficulty} />
        {commercial &&
          <NewHykePrice setPrice={setPrice} />
        }
        <br />
        {loadingCreateHyke ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button
            onClick={() => createNewHyke()}
            variant="contained"
            type="submit"
          >
            Create Hyke
          </Button>
        )}
        <br />
        <br />
      </Stack>
    </div>
  );
};

export default NewHyke;
