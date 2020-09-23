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
import Dialog from "../DialogDel";
import NoteIcon from "@material-ui/icons/Note";
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import firebase from "../../firebase";
import stayl from "../dash.module.css";
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
  center2: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
}));

export default function Assignment(props) {
  const classes = useStyles();
  const { copy } = props;

  const [subject, setSubject] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [size, setSize] = useState(0);
  const [lesson, setLesson] = useState([]);
  const [id, setId] = useState(props.id ? props.id : "null");

  useEffect(() => {
    if (!props.id) {
      setId("null");
    } else {
      setId(props.id);
    }
  }, [props.id]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("assignment")
      .doc(id)
      .collection("text")
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

  const lessonForText = lesson.map(function (post) {
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
                onClick={() => deletdeeText(hihi.id)}
              /> */}
              <Dialog assignment={true} idd={hihi.id} id={id} />
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
                  title="Assignments"
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
                      Assignments :{" "}
                    </Typography>
                    <Typography
                      component="body1"
                      variant="paragraph"
                      color="textSecondary"
                    >
                      {!size ? "N/A" : size} <br />
                    </Typography>
                  </Grid>

                  <Grid item lg={12} md={12} xs={12}>
                    <Paper className={classes.paper3}>
                      <CardContent>
                        <div
                          style={{
                            marginTop: "-30px",
                          }}
                        >
                          <form
                            className={classes.form}
                            onSubmit={(e) => e.preventDefault() && false}
                          >
                            <FormControl
                              margin="normal"
                              required
                              fullWidth
                              className={classes.custom}
                            >
                              <FormLabel component="legend">Subject</FormLabel>
                              <RadioGroup row aria-label="subjects">
                                <FormControlLabel
                                  value="English"
                                  onClick={(e) => setSubject(e.target.value)}
                                  control={<Radio color="primary" />}
                                  label="English"
                                  labelPlacement="end"
                                />
                                <FormControlLabel
                                  value="Science"
                                  onClick={(e) => setSubject(e.target.value)}
                                  control={<Radio color="primary" />}
                                  label="Science"
                                  labelPlacement="end"
                                />
                                <FormControlLabel
                                  value="Math"
                                  onClick={(e) => setSubject(e.target.value)}
                                  control={<Radio color="primary" />}
                                  label="Math"
                                  labelPlacement="end"
                                />
                              </RadioGroup>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                              <InputLabel htmlFor="title">
                                Lesson Title
                              </InputLabel>
                              <Input
                                id="title"
                                name="title"
                                autoComplete="off"
                                className={classes.input}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                              <TextField
                                id="standard-multiline-flexible"
                                label="Body"
                                multiline
                                rowsMax={10}
                                onChange={(e) => setBody(e.target.value)}
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
                        </div>
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
                        <Typography variant="h5">Summary</Typography>
                        <Grid item lg={12} md={12} xs={12}>
                          <Accordion className={classes.acc}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>
                                Assignments
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
      await addAssignment(subject, title, body, FieldValue);

      alert("Assignment Added");
    } catch (error) {
      alert(error.message);
    }
  }

  async function addAssignment() {
    const FieldValue = firebase.firestore.FieldValue;
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }

      return firebase
        .firestore()
        .collection("assignment")
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
