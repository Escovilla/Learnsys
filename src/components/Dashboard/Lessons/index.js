import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import "../../App/style.css";
import {
  Button,
  FormControl,
  Input,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  InputLabel,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import NoteIcon from "@material-ui/icons/Note";
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AddIcon from "@material-ui/icons/Add";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import firebase from "../../firebase";
import stayl from "../dash.module.css";
import PersonIcon from "@material-ui/icons/Person";
import { CircularProgress } from "@material-ui/core";
import Player from "../Player";
import Dialog from "../DialogDel";
import FullScreen from "../fullScreen";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    minHeight: 500,
    maxHeight: "auto",
  },
  avatar2: {
    marginTop: theme.spacing(2),
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "20px",
    color: "lightblue",
    background: "none",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper2: {
    adjustItems: "right",
    border: ".5px solid gray",
    minHeight: 500,
    maxHeight: "auto",
    width: "100%",
    display: "flex",

    flexDirection: "column",
  },
  paper3: {
    adjustItems: "right",
    boxShadow: "none",

    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  CardHeader: {
    marginTop: 0,
    height: 75,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  center: {
    marginTop: 30,
    marginLeft: 20,
    textAlign: "left",
    alignItems: "center",
  },
  form: {
    width: "70%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  acc: {
    border: "1px solid gray",
    marginBottom: "5px",
    boxShadow: "none",
  },
  custom: {
    marginBottom: "-15px",
  },
  center2: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Lessons(props) {
  const classes = useStyles();
  const { copy } = props;

  const fixedHeightPaper = clsx(classes.paper3, classes.fixedHeight);
  const [url, setUrl] = useState();
  const [text, setText] = useState();
  const [subject, setSubject] = useState();
  const [title, setTitle] = useState();
  const [sourceUrl, setSourceUrl] = useState();
  const [body, setBody] = useState();
  const [size, setSize] = useState(0);
  const [sizeText, setSizeText] = useState(0);
  const [lesson, setLesson] = useState([]);
  const [lessonTxt, setLessonTxt] = useState([]);
  const total = size + sizeText;
  const [id, setId] = useState(props.id ? props.id : "null");
  const [status, setStatus] = useState();
  useEffect(() => {
    if (!props.id) {
      setId("null");
    } else {
      setId(props.id);
    }
  }, [props.id]);

  useEffect(() => {
    getStatus().then((val) => {
      setStatus(val);
    });
  }, []);

  const OnclickUrl = () => {
    setUrl(true);
    setText(false);
  };
  const OnclickText = () => {
    setText(true);
    setUrl(false);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("lessons")
      .doc(id)
      .collection("url")
      .onSnapshot((querySnapshot) => {
        setSize(querySnapshot.size);
        const nani = querySnapshot.docs.map((docSnapshot) => [
          {
            id: docSnapshot.id,
            name: docSnapshot.data(),
          },
        ]);
        setLesson(nani);
      });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("lessons")
      .doc(id)
      .collection("text")
      .onSnapshot((querySnapshot) => {
        setSizeText(querySnapshot.size);
        const nani = querySnapshot.docs.map((docSnapshot) => [
          {
            id: docSnapshot.id,
            name: docSnapshot.data(),
          },
        ]);
        setLessonTxt(nani);
      });

    return unsubscribe;
  }, []);

  const LessonForurl = lesson.map(function (post) {
    return post.map(function (hihi) {
      const names = hihi.name;
      return (
        <Grid item lg={12} md={12} xs={12}>
          <Accordion className={classes.acc} key={hihi.id} data-id={hihi.id}>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {/* <DeleteIcon
                style={{ marginRight: 30 }}
                onClick={() => deletdee(hihi.id)}
              /> */}
              <Dialog idd={hihi.id} id={id} url={true} />
              <Typography variant="body1">{names.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <FullScreen
                  data={<Player url={names.sourceUrl} />}
                  title={names.title}
                  body={names.body}
                />
                <Grid item lg={12} md={12} xs={12}>
                  Subject:{names.subject}
                  <br />
                  Url:{names.sourceUrl}
                  <br />
                  title:{names.title} <br />
                  <Player url={names.sourceUrl} />
                  body:{names.body} <br />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      );
    });
  });
  const lessonForText = lessonTxt.map(function (post) {
    return post.map(function (hihi) {
      const names = hihi.name;
      return (
        <Grid item lg={12} md={12} xs={12}>
          <Accordion className={classes.acc} key={hihi.id} data-id={hihi.id}>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Dialog idd={hihi.id} id={id} />
              <Typography variant="body1">{names.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} xs={12}>
                  Subject:{names.subject}
                  <br />
                  title:{names.title} <br />
                  body:{names.body} <br />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      );
    });
  });
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardContent>
              <Paper className={[classes.paper2, "ojojo"].join(" ")}>
                <CardHeader
                  className={classes.CardHeader}
                  avatar={
                    <Avatar aria-label="profile" className={classes.avatar2}>
                      <NoteIcon />
                    </Avatar>
                  }
                  title="Lessons"
                  subheader="Overview"
                />

                <Grid container spacing={1}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                    className={classes.center}
                    style={{ marginTop: "5px" }}
                  >
                    <Typography variant="h5">Stats</Typography>
                    <Typography component="body1" variant="paragraph">
                      Lessons :{" "}
                    </Typography>
                    <Typography
                      component="body1"
                      variant="paragraph"
                      color="textSecondary"
                    >
                      {!total ? "N/A " : total} <br />
                    </Typography>
                    <Typography
                      component="body1"
                      variant="paragraph"
                      fontWeight="light"
                    >
                      Url :{" "}
                    </Typography>
                    <Typography
                      component="body1"
                      variant="paragraph"
                      color="textSecondary"
                    >
                      {!size ? "N/A " : size}
                      <br />
                    </Typography>
                    <Typography component="body1" variant="paragraph">
                      Text :{" "}
                    </Typography>
                    <Typography
                      component="body1"
                      variant="paragraph"
                      color="textSecondary"
                    >
                      {!sizeText ? "N/A " : sizeText} <br />
                    </Typography>
                  </Grid>

                  <Grid item lg={12} md={12} xs={12}>
                    <Paper className={classes.paper3}>
                      <CardContent>
                        <Accordion className={classes.acc}>
                          <AccordionSummary
                            expandIcon={<AddIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography variant="h5">Add Lesson</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div
                              style={{
                                marginTop: "10px",
                              }}
                            >
                              Select a Source:{" "}
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={OnclickUrl}
                              >
                                URL
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={OnclickText}
                                // disabled="disabled"
                              >
                                TEXT
                              </Button>
                              {!url ? (
                                ""
                              ) : (
                                <>
                                  <form
                                    className={classes.form}
                                    onSubmit={(e) =>
                                      e.preventDefault() && false
                                    }
                                  >
                                    You can add a Youtube, Facebook, Soundcloud,
                                    Dailymotion, Twitch video URL
                                    <FormControl
                                      margin="normal"
                                      required
                                      fullWidth
                                      className={classes.custom}
                                      style={{ marginTop: "40px" }}
                                    >
                                      <FormLabel component="legend">
                                        Subject
                                      </FormLabel>
                                      <RadioGroup row aria-label="subjects">
                                        <FormControlLabel
                                          value="English"
                                          onClick={(e) =>
                                            setSubject(e.target.value)
                                          }
                                          control={<Radio color="primary" />}
                                          label="English"
                                          labelPlacement="end"
                                        />
                                        <FormControlLabel
                                          value="Science"
                                          onClick={(e) =>
                                            setSubject(e.target.value)
                                          }
                                          control={<Radio color="primary" />}
                                          label="Science"
                                          labelPlacement="end"
                                        />
                                        <FormControlLabel
                                          value="Math"
                                          onClick={(e) =>
                                            setSubject(e.target.value)
                                          }
                                          control={<Radio color="primary" />}
                                          label="Math"
                                          labelPlacement="end"
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                    <FormControl
                                      margin="normal"
                                      required
                                      fullWidth
                                    >
                                      <InputLabel htmlFor="title">
                                        Lesson Title
                                      </InputLabel>
                                      <Input
                                        id="title"
                                        name="title"
                                        autoComplete="off"
                                        className={classes.input}
                                        onChange={(e) =>
                                          setTitle(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <FormControl
                                      margin="normal"
                                      required
                                      fullWidth
                                    >
                                      <InputLabel htmlFor="url">
                                        Source URL
                                      </InputLabel>
                                      <Input
                                        id="url"
                                        name="url"
                                        autoComplete="off"
                                        className={classes.input}
                                        onChange={(e) =>
                                          setSourceUrl(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <FormControl
                                      margin="normal"
                                      required
                                      fullWidth
                                    >
                                      <TextField
                                        id="standard-multiline-flexible"
                                        label="Body"
                                        multiline
                                        rowsMax={10}
                                        onChange={(e) =>
                                          setBody(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <Button
                                      type="submit"
                                      style={{
                                        float: "right",
                                      }}
                                      disabled={id === "null" ? true : false}
                                      variant="contained"
                                      color="primary"
                                      className={classes.submit}
                                      onClick={onConfirm}
                                    >
                                      {id === "null"
                                        ? "Please Select a Student"
                                        : "Save"}
                                    </Button>
                                  </form>
                                </>
                              )}
                              {!text ? (
                                ""
                              ) : (
                                <>
                                  <form
                                    className={classes.form}
                                    onSubmit={(e) =>
                                      e.preventDefault() && false
                                    }
                                  >
                                    TEXT
                                    <FormControl
                                      margin="normal"
                                      required
                                      fullWidth
                                      style={{ marginTop: "40px" }}
                                      className={classes.custom}
                                    >
                                      <FormLabel component="legend">
                                        Subject
                                      </FormLabel>
                                      <RadioGroup row aria-label="subjects">
                                        <FormControlLabel
                                          value="English"
                                          onClick={(e) =>
                                            setSubject(e.target.value)
                                          }
                                          control={<Radio color="primary" />}
                                          label="English"
                                          labelPlacement="end"
                                        />
                                        <FormControlLabel
                                          value="Science"
                                          onClick={(e) =>
                                            setSubject(e.target.value)
                                          }
                                          control={<Radio color="primary" />}
                                          label="Science"
                                          labelPlacement="end"
                                        />
                                        <FormControlLabel
                                          value="Math"
                                          onClick={(e) =>
                                            setSubject(e.target.value)
                                          }
                                          control={<Radio color="primary" />}
                                          label="Math"
                                          labelPlacement="end"
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                    <FormControl
                                      margin="normal"
                                      required
                                      fullWidth
                                    >
                                      <InputLabel htmlFor="title">
                                        Lesson Title
                                      </InputLabel>
                                      <Input
                                        id="title"
                                        name="title"
                                        autoComplete="off"
                                        className={classes.input}
                                        // value={name}
                                        onChange={(e) =>
                                          setTitle(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <FormControl
                                      margin="normal"
                                      required
                                      fullWidth
                                    >
                                      <TextField
                                        id="standard-multiline-flexible"
                                        label="Body"
                                        multiline
                                        rowsMax={10}
                                        onChange={(e) =>
                                          setBody(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <Button
                                      disabled={id === "null" ? true : false}
                                      type="submit"
                                      style={{
                                        float: "right",
                                      }}
                                      variant="contained"
                                      color="primary"
                                      className={classes.submit}
                                      onClick={onConfirmText}
                                    >
                                      {id === "null"
                                        ? "Please Select a Student"
                                        : "Save"}
                                    </Button>
                                  </form>
                                </>
                              )}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </CardContent>
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                    style={{ marginTop: "-40px" }}
                  >
                    <Paper className={classes.paper3}>
                      <CardContent>
                        {/* <Typography variant="h5">
                          {LessonForurl == 0 ? "" : "Lessons Url"}
                        </Typography> */}
                        <Typography variant="h5">Summary</Typography>
                        <Grid item lg={12} md={12} xs={12}>
                          <Accordion className={classes.acc}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>
                                Lessons Url
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {LessonForurl == 0 ? (
                                <div className={classes.center2}>NO DATA</div>
                              ) : (
                                <Grid item lg={12} md={12} xs={12}>
                                  {LessonForurl}
                                </Grid>
                              )}
                            </AccordionDetails>
                          </Accordion>
                        </Grid>

                        <Grid item lg={12} md={12} xs={12}>
                          <Accordion className={classes.acc}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>
                                Lessons Text
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {lessonForText == 0 ? (
                                <div className={classes.center2}>NO DATA</div>
                              ) : (
                                <Grid item lg={12} md={12} xs={12}>
                                  {lessonForText}
                                </Grid>
                              )}
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      </CardContent>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box className={stayl.wawawaw} pt={2}>
        {copy}
      </Box>
    </Container>
  );
  async function onConfirm() {
    try {
      const FieldValue = firebase.firestore.FieldValue;
      await addLessonUrl(subject, title, sourceUrl, body, FieldValue);

      alert("Lesson Added");
    } catch (error) {
      alert(error.message);
    }
  }
  async function onConfirmText() {
    try {
      const FieldValue = firebase.firestore.FieldValue;
      await addLessonText(subject, title, body, FieldValue);

      alert("Lesson Added");
    } catch (error) {
      alert(error.message);
    }
  }
  async function getStatus() {
    try {
      const address = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();
      return address.get("status");
    } catch (error) {}
  }

  async function addLessonUrl() {
    const FieldValue = firebase.firestore.FieldValue;
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }

      return firebase
        .firestore()
        .collection("lessons")
        .doc(id)
        .collection("url")
        .add({
          subject: subject,
          title: title,
          sourceUrl: sourceUrl,
          body: body,
          timestamp: FieldValue.serverTimestamp(),
        });
    } catch (error) {
      alert(error.message);
    }
  }
  async function addLessonText() {
    const FieldValue = firebase.firestore.FieldValue;
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }

      return firebase
        .firestore()
        .collection("lessons")
        .doc(id)
        .collection("text")
        .add({
          subject: subject,
          title: title,
          body: body,
          timestamp: FieldValue.serverTimestamp(),
        });
    } catch (error) {
      alert(error.message);
    }
  }
}
