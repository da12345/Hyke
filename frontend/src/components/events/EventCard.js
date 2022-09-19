import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import { auth, db, logout } from "../../config/firebase";
import {
  Button,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import StarIcon from "@mui/icons-material/Star";
import { Comment } from "@mui/icons-material";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  query,
  collection,
  getDocs,
  where,
  documentId,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { ListItemAvatar } from "@mui/material";
import { Fragment } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function EventCard({
  id,
  n,
  title,
  distance,
  loadingUser,
  userData,
  location,
  difficulty,
  duration,
  date,
  availability,
  description,
  photo_url,
  data,
  created_by,
  participants,
  price,
  comments,
  rating,
  admin,
  commercial,
  refresh,
  styled,
}) {
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  if (!rating) {
    rating = 0;
  }

  var hykedate = date.seconds;
  var currentdate = Math.round(new Date().getTime() / 1000);

  var participantboolean;

  for (let i = 0; i < participants.length; i++) {
    if (user && participants[i].email === user.email) {
      participantboolean = true;
    }
  }

  const bg_img_arr = [
    "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/3355732/pexels-photo-3355732.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2273642/pexels-photo-2273642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/3626745/pexels-photo-3626745.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  ];

  const changeSignedUp = async () => {
    setLoadingRegister(true);
    try {
      const q_u = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc_u = await getDocs(q_u);
      const data_u = doc_u.docs[0].data();

      const q_h = query(collection(db, "hykes"), where(documentId(), "==", id));

      const doc_h = await getDocs(q_h);
      const data_h = doc_h.docs[0].data();

      let new_participants = data_h.participants;

      const userExists = new_participants.some(
        (user) => user.uid === data_u.uid
      );
      if (userExists) {
        var removeIndex = new_participants
          .map((item) => item.uid)
          .indexOf(data_u.uid);
        ~removeIndex && new_participants.splice(removeIndex, 1);
      } else {
        new_participants.push(data_u);
      }

      await updateDoc(doc(db, "hykes", id), {
        participants: new_participants,
      });

      refresh();
      //setSignedUp(!signedUp);
    } catch (err) {
      alert("An error occured while fetching user data");
      return;
    }
    setTimeout(() => {
      setLoadingRegister(false);
    }, 500);
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const deleteEvent = async () => {
    deleteDoc(doc(db, "hykes", id));
    refresh();
  };

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

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const checkUserRegisterd = () => {
    return participants.some((user) => user.uid === userData.uid);
  };

  const setRatingHelper = async (e) => {
    sendRatingToBackend(e.target.value);
    refresh();
  };

  const sendRatingToBackend = async (e) => {
    setLoadingRegister(true);
    try {
      const q_u = query(collection(db, "hykes"));
      const doc_u = await getDocs(q_u);
      await updateDoc(doc(db, "hykes", id), {
        rating: e,
      });
    } catch (err) {
      alert("An error occured while adding rating");
      return;
    }
    setTimeout(() => {
      setLoadingRegister(false);
    }, 500);
  };

  const enableCommentButton = () => {
    return comment ? false : true;
  };

  const changeCommentButtonStyle = () => {
    return comment ? "comments-button-enabled" : "comments-button-disabled";
  };

  const [comment, setComment] = useState("");

  const addNewComment = async () => {
    try {
      const q_u = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc_u = await getDocs(q_u);
      const data_u = doc_u.docs[0].data();

      const q_h = query(collection(db, "hykes"), where(documentId(), "==", id));

      const doc_h = await getDocs(q_h);
      const data_h = doc_h.docs[0].data();

      let new_comments = data_h.comments;
      let new_comment = {
        text: comment,
        user: data_u,
        time: Timestamp.now(),
      };
      new_comments.push(new_comment);

      await updateDoc(doc(db, "hykes", id), {
        comments: new_comments,
      });

      refresh();
      setComment("");
    } catch (err) {
      alert("An error occured while fetching user data");
      return;
    }
  };

  const handleCommentValue = (e) => {
    setComment(e.target.value);
  };

  return (
    <div style={{ padding: "8px" }}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          action={
            admin ? (
              <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
                <MoreVertIcon />
              </IconButton>
            ) : (
              <></>
            )
          }
          title={title}
          subheader={created_by.commercial&&'Commercial organizer'}
        />
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Link
            to={"/profile"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem onClick={(handleCloseUserMenu, deleteEvent)}>
              <Typography textAlign="center">Delete</Typography>
            </MenuItem>
          </Link>
        </Menu>
        <CardMedia
          component="img"
          height="194"
          image={
            bg_img_arr[n] !== undefined
              ? bg_img_arr[n]
              : "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          }
          alt="Paella dish"
        />
        {description && (description.length > 20) && 
        <CardContent>
          <p>
            {description}
          </p>
        </CardContent>
        }
        <CardContent>
          {currentdate > hykedate && <p>This hyke is complete.</p>}
          <br></br>
          {currentdate > hykedate && participantboolean && (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Rating"
                  onChange={setRatingHelper}
                  defaultValue={rating}
                  IconComponent={() => <StarIcon />}
                  style={{ paddingRight: "20px" }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
              <br></br>
              <br></br>
            </Box>
          )}
        </CardContent>
        <Divider />
        <CardContent>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary={`Date: ${new Date(
                  date.seconds * 1000
                ).toLocaleDateString()}, kl. ${new Date(
                  date.seconds * 1000
                ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={`Starting location: ${location.structured_formatting.main_text}, ${location.structured_formatting.secondary_text}`}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`Distance: ${distance} Km`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`Duration: ${duration} Hours`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={`Difficulty (Ascending 1-5): ${difficulty} `}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`Participation limit: ${availability}`} />
            </ListItem>
            {price &&
              <ListItem disablePadding>
                <ListItemText primary={`Price: ${price} NOK`} secondary={'Paid in cash when you show up.'}/>
              </ListItem>
            }
          </List>
        </CardContent>

        <Divider />
        {participants && participants.length > 0 && (
          <Fragment>
            <CardContent style={{ padding: 0 }}>
              <List sx={{ width: "100%", bgcolor: "#FAFAFA" }}>
                {participants.map((item, nr) => (
                  <Fragment>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          {...stringAvatar(
                            `${item.firstName} ${item.lastName}`
                          )}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.firstName} ${item.lastName} (${item.username})`}
                        secondary={`(${item.email})`}
                      />
                    </ListItem>
                    {participants.length > nr + 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </Fragment>
                ))}
              </List>
            </CardContent>
            <Divider />
          </Fragment>
        )}
        <CardContent  style={{ padding: 0 }}>
          <p style={{padding:'12px', fontWeight:'500'}}>
          Comments
          </p>
          {comments && comments.length > 0 ? (
            <Fragment>
                <List sx={{ width: "100%", bgcolor: "#FAFAFA" }}>
                  {comments.map((item, nr) => (
                    <Fragment>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            {...stringAvatar(
                              `${item.user.firstName} ${item.user.lastName}`
                            )}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          disableTypography
                          primary={
                            <Fragment>
                              <Typography variant="subtitle1">
                                {item.user.firstName} {item.user.lastName}{" "}
                                &nbsp;
                                <Typography variant={"caption"}>
                                  (
                                  {new Date(
                                    item.time.seconds * 1000
                                  ).toLocaleDateString()}
                                  ,
                                  {new Date(
                                    item.time.seconds * 1000
                                  ).toLocaleTimeString()}
                                  )
                                </Typography>
                              </Typography>
                            </Fragment>
                          }
                          //secondary={` ${item.text} `}
                          secondary={
                            <Fragment>
                              <Typography variant={"body2"}>
                                {item.text}
                              </Typography>
                            </Fragment>
                          }
                        />
                      </ListItem>
                      {comments.length > nr + 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </Fragment>
                  ))}
                </List>
            </Fragment>
          )
            :
          (
            <p style={{padding:'12px'}}><i>No comments</i></p>
          )}
          <List></List>
        </CardContent>
        
        {!loadingUser && (
          (commercial === false) &&
          <Fragment>
            <Divider />
            <CardContent>
              <TextField
                value={comment}
                id="comments-input"
                onChange={handleCommentValue}
                type="text"
                placeholder="Add a comment..."
                style={{ width: "80%" }}
                focused
                size="small"
              />
              <Button
                onClick={addNewComment}
                type="submit"
                className="comments-button"
                id={changeCommentButtonStyle()}
                disabled={enableCommentButton()}
              >
                Post
              </Button>
            </CardContent>
          </Fragment>
        )}
        <Divider />
        {!loadingUser && (
          (commercial === false) &&
          <CardActions disableSpacing>
            {userData ? (
              loadingRegister ? (
                <Fragment>
                  <CircularProgress
                    size={24}
                    style={{
                      marginLeft: "auto",
                      marginRight: "8px",
                      marginTop: "6px",
                      marginBottom: "6px",
                    }}
                  />
                </Fragment>
              ) : checkUserRegisterd() ? (
                <Button
                  disabled={currentdate > hykedate}
                  color="error"
                  onClick={changeSignedUp}
                  style={{ marginLeft: "auto", marginRight: "0" }}
                >
                  Leave Hyke
                </Button>
              ) : (
                <Button
                  disabled={availability <= participants.length}
                  variant="contained"
                  onClick={changeSignedUp}
                  style={{ marginLeft: "auto", marginRight: "0" }}
                >
                  Join Hyke
                </Button>
              )
            ) : (
              <Button
                onClick={() => navigate("/login")}
                style={{ marginLeft: "auto", marginRight: "0" }}
              >
                Login to join hyke
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </div>
  );
}
