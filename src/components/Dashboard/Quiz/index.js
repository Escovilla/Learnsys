import React, { useEffect, useState, useLayoutEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import "../../App/style.css";
import {
  FormControl,
  Input,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  InputLabel,
} from "@material-ui/core";
import Dialog from "../DialogDel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
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
import { CircularProgress } from "@material-ui/core";
import FullQuiz from "../FullQuiz";
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
    width: "auto",
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
    // width: "100%",
    // height: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    // alignItems: "center",
  },
}));

export default function Quiz(props) {
  const classes = useStyles();
  const { copy } = props;

  const fixedHeightPaper = clsx(classes.paper3, classes.fixedHeight);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState();
  const [title, setTitle] = useState();
  const [intcount, setIntCount] = useState([]);
  const [counter, setCounter] = useState(0);
  // const total = size + sizeText;
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

  //counter
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("quiz")
      .doc(id)
      .collection("Quizzes")
      .onSnapshot((querySnapshot) => {
        const nani = querySnapshot.docs.map((docSnapshot) => docSnapshot.id);
        setIntCount(nani);
      });

    return unsubscribe;
  }, []);

  const count = Math.max.apply(Math, intcount);
  const tester = count == "-Infinity" ? "" : count;
  const finalCount = tester + 1;
  //end of counter

  //////////////////////////////////////////////////////////////////////////////////////////////////
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("quiz")
      .doc(id)
      .collection("Quizzes")
      .onSnapshot((querySnapshot) => {
        const nani = querySnapshot.docs.map((docSnapshot) => [
          {
            id: docSnapshot.id,
            data: docSnapshot.data(),
            timeStamp: docSnapshot.data().timestamp,
          },
        ]);
        setData(nani);
      });
    return unsubscribe;
  }, []);

  const forDelete = data.map(function (post) {
    return post.find(function (element) {
      const data = element.data;
      return data.quizNo == null;
    });
  });

  const exactDel = forDelete.filter(function (element) {
    return element !== undefined;
  });

  const size = data.length;
  const deleted = exactDel.length;
  const finalSize = size - deleted;

  console.log(size);
  console.log(forDelete);
  console.log(deleted);

  const test = data.map(function (post) {
    return post.map(function (hihi) {
      const data = hihi.id;
      return data;
    });
  });
  const latest = test.slice().sort((a, b) => a - b);
  const largest = [latest[latest.length - 1]];
  const tostr = largest.toString();

  // console.log(tester);
  // const [tostr, setTostr] = useState(hihihi);

  //get the latest
  const testing = data.map(function (post) {
    return post.find(function (element) {
      return element.id == tostr;
    });
  });

  //this function get the specific id's whether is has the questions or not

  const [yawaase, setyawaa] = useState(null);
  const [check, setCheck] = useState([]);
  // const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = firebase
  //     .firestore()
  //     .collection("quiz")
  //     .doc(id)
  //     .collection("Quizzes")
  //     .doc("1")
  //     .collection("questions")
  //     .onSnapshot((querySnapshot) => {
  //       const nani = querySnapshot.docs.map((docSnapshot) =>
  //         docSnapshot.data()
  //       );
  //       setQuestions(nani);
  //     });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    if (tostr) {
      const unsubscribe = firebase
        .firestore()
        .collection("quiz")
        .doc(id)
        .collection("Quizzes")
        .doc(tostr)
        .collection("questions")
        .onSnapshot((querySnapshot) => {
          const nani = querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          );
          setCheck(nani);
        });
      return unsubscribe;
    }
  }, [tostr]);

  const QuestionChecker = check.map(function (post) {
    return post.question;
  });

  const rightContent = testing.filter(function (element) {
    return element !== undefined;
  });

  const DataChecker = rightContent.map(function (post) {
    return post;
  });

  let jojimac;
  jojimac =
    DataChecker == 0
      ? "save"
      : QuestionChecker != 0
      ? "save"
      : QuestionChecker == 0
      ? "continue"
      : "save";

  useEffect(() => {
    const timer = setTimeout(() => {
      setyawaa(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("quiz")
      .doc(id)
      .collection("Quizzes")
      .onSnapshot((querySnapshot) => {
        const nani = querySnapshot.docs.map((docSnapshot) => [
          { id: docSnapshot.id, data: docSnapshot.data() },
        ]);
        setQuizzes(nani);
      });
    return unsubscribe;
  }, []);

  // console.log(finalCount, tester);
  const summaryQuiz = quizzes.map(function (post) {
    return post.map(function (hihi) {
      const data = hihi.data;
      if (data.status === "hide") {
      } else {
        return (
          <Grid item lg={12} md={12} xs={12}>
            <Accordion className={classes.acc} key={hihi.id} data-id={hihi.id}>
              <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {hihi.id == tester ? (
                  jojimac == "continue" ? (
                    <DeleteIcon style={{ marginRight: 30, color: "gray" }} />
                  ) : (
                    <Dialog idd={hihi.id} id={id} quiz={true} />
                  )
                ) : (
                  <Dialog idd={hihi.id} id={id} quiz={true} />
                )}
                <Typography variant="body1">Quiz no.{hihi.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {/* <FullScreen
                  data={<Player url={names.sourceUrl} />}
                  title={names.title}
                  body={names.body}
                /> */}
                  <Grid item lg={12} md={12} xs={12}>
                    Quiz no:{hihi.id}
                    <br />
                    Subject:{data.subject} <br />
                    title:{data.title} <br />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        );
      }
    });
  });
  // const summaryQuizRef = quizzes.map(function (post) {
  //   return post.map(function (hihi) {
  //     const data = hihi.data;
  //     if (data.status !== "hide") {
  //       return hihi.id;
  //     }
  //   });
  // });
  // let object = summaryQuizRef;
  // object.push(undefined);
  // let maxRetries = 0;
  // object.forEach((element) => element !== undefined && maxRetries++);

  // console.log(object);
  // console.log(maxRetries);

  // console.log("summaryQuizSize:", summaryQuizSize);
  // console.log("quizzes:", quizzes);

  const coontinue = data.map(function (post) {
    return post.map(function (hihi) {
      if (tostr == hihi.id) {
        return (
          <>
            <div
              style={{
                border: ".5px solid gray",
                padding: "10px",
              }}
            >
              <Typography component="h5">
                Quiz no.{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {hihi.id}
                </Typography>
              </Typography>

              <Typography component="h5">
                Quiz Title :{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {hihi.data.title}
                </Typography>
              </Typography>

              <Typography component="h5">
                Quiz Subject :
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {hihi.data.subject}
                </Typography>{" "}
              </Typography>
              <br />
              <Typography
                component="body1"
                variant="paragraph"
                color="textSecondary"
              >
                Complete your quiz by continuing
              </Typography>
            </div>
          </>
        );
      }
    });
  });
  // const yati = finalCount.toString();
  // console.log(yati);
  // const coontinue = lcheck.map(function (post) {
  //   return null;

  //////////////////////////////////////////////////////////////////////////////////////////////////

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
                  title="Quizzes"
                  subheader="Overview"
                />
                <Grid container spacing={1}>
                  <Grid item lg={3} md={3} xs={12} className={classes.center2}>
                    <div>
                      <Typography variant="h5">Stats</Typography>

                      <Typography component="body1" variant="paragraph">
                        Quizzes :{" "}
                      </Typography>
                      <Typography
                        component="body1"
                        variant="paragraph"
                        color="textSecondary"
                      >
                        {finalSize} <br />
                      </Typography>
                      <Typography
                        component="body1"
                        variant="paragraph"
                        fontWeight="light"
                      >
                        English :{" "}
                      </Typography>
                      <Typography
                        component="body1"
                        variant="paragraph"
                        color="textSecondary"
                      >
                        {/* {!size ? "N/A " : size} */}N/A <br />
                      </Typography>
                      <Typography component="body1" variant="paragraph">
                        Science :{" "}
                      </Typography>
                      <Typography
                        component="body1"
                        variant="paragraph"
                        color="textSecondary"
                      >
                        {/* {!sizeText ? "N/A " : sizeText} <br /> */}N/A <br />
                      </Typography>
                      <Typography component="body1" variant="paragraph">
                        Math :{" "}
                      </Typography>
                      <Typography
                        component="body1"
                        variant="paragraph"
                        color="textSecondary"
                      >
                        {/* {!sizeText ? "N/A " : sizeText} <br /> */}N/A <br />
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item lg={7} md={7} xs={10} className={classes.center}>
                    {yawaase == null ? (
                      ""
                    ) : (
                      <Typography variant="h5">
                        Add Quiz
                        {/* <FullQuiz /> */}
                      </Typography>
                    )}
                    <form
                      className={classes.form}
                      style={{ marginTop: "20px" }}
                      onSubmit={(e) => e.preventDefault() && false}
                    >
                      {yawaase == null ? (
                        <Grid
                          item
                          lg={9}
                          md={9}
                          xs={12}
                          className={classes.center}
                        >
                          <div
                            style={{
                              height: "162px",
                              display: "flex",
                              marginBottom: "100px",
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                            width
                          >
                            <CircularProgress />
                          </div>
                        </Grid>
                      ) : (
                        <>
                          {jojimac == "save" ? (
                            <>
                              <Typography variant="b1">
                                Quiz no. {finalCount}
                                {/* <FullQuiz /> */}
                              </Typography>
                              <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="title">
                                  Quiz Title
                                </InputLabel>
                                <Input
                                  id="title"
                                  name="title"
                                  autoComplete="off"
                                  className={classes.input}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </FormControl>
                              <FormControl
                                margin="normal"
                                required
                                fullWidth
                                className={classes.custom}
                                style={{ marginTop: "20px" }}
                              >
                                <FormLabel component="legend">
                                  Subject
                                </FormLabel>
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
                            </>
                          ) : (
                            coontinue
                          )}
                        </>
                      )}
                      {yawaase == null ? (
                        ""
                      ) : (
                        <FullQuiz
                          subject={subject}
                          finalCount={finalCount}
                          title={title}
                          id={id}
                          save={jojimac}
                          quizNo={tester}
                          className={classes.submit}
                        />
                      )}
                    </form>
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
                                Quizzes
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {summaryQuiz == 0 ? (
                                <div className={classes.center2}>NO DATA</div>
                              ) : (
                                <Grid item lg={12} md={12} xs={12}>
                                  {summaryQuiz}
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
}
