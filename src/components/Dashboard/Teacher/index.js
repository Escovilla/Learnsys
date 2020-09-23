import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import firebase from "../../firebase";
import stayl from "../dash.module.css";
import PersonIcon from "@material-ui/icons/Person";
import Chart from "../Chart";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 540,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    marginTop: theme.spacing(4),
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "20px",
    color: "none",
    background: green[300],
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

  paper: {
    padding: theme.spacing(3),
    adjustItems: "right",
    // boxShadow: "  5px 10px #888888",
    border: ".5px solid gray",
    height: 540,
    // minHeight: 300,
    width: "auto",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  paper2: {
    adjustItems: "right",
    // boxShadow: "  5px 10px #888888",
    border: ".5px solid gray",

    height: 500,
    // minHeight: 300,
    width: "auto",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  paper3: {
    adjustItems: "right",
    boxShadow: "none",
    height: 200,
    width: "auto",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 350,
    width: 600,
  },
  ajustible: {
    maxHeight: "auto",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  CardHeader: {
    marginTop: 0,
    height: 75,
  },
  light: {
    fontWeight: 100,
  },
  wrapper: {
    height: "500px !important",
  },
  tag: {
    // fontWeight: 100,
    // fontSize: "12px",
    color: "#fa8072",
    // marginLeft: 7,
  },
}));

export default function Teacher(props) {
  const { copy } = props;
  const classes = useStyles();
  const name =
    firebase.auth().currentUser && firebase.auth().currentUser.displayName;
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [student, setStudent] = useState("");
  const [studentLabel, setSstudentLabel] = useState("");
  const [studentname, setStudentname] = useState([]);
  const fixedHeightPaper = clsx(classes.paper3, classes.fixedHeight);
  const [lessonsSize, setLessonSize] = useState(0);
  const [lessonSizeText, setLessonSizeText] = useState(0);
  const [assignmentSize, setAssignmentSize] = useState(0);
  const [quiz, setQuiz] = useState(0);
  // const { id } = props;

  const [id, setId] = useState(props.id ? props.id : "null");

  useEffect(() => {
    if (!props.id) {
      setId("null");
    } else {
      setId(props.id);
    }
  }, [props.id]);

  // console.log(props.id);
  // const id = "null";
  const total = lessonsSize + lessonSizeText;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("assignment")
      .doc(id)
      .collection("text")
      .onSnapshot((querySnapshot) => {
        setAssignmentSize(querySnapshot.size);
      });
    return unsubscribe;
  }, [id]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("lessons")
      .doc(id)
      .collection("url")
      .onSnapshot((querySnapshot) => {
        setLessonSize(querySnapshot.size);
      });
    return unsubscribe;
  }, [id]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("lessons")
      .doc(id)
      .collection("text")
      .onSnapshot((querySnapshot) => {
        setLessonSizeText(querySnapshot.size);
      });
    return unsubscribe;
  }, [id]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("quiz")
      .doc(id)
      .collection("Quizzes")
      .onSnapshot((querySnapshot) => {
        setQuiz(querySnapshot.size);
      });

    return unsubscribe;
  }, [id]);
  useEffect(() => {
    getStatus().then((val) => {
      setStatus(val);
    });
    getAddress().then((val) => {
      setAddress(val);
    });
    getStudentName().then((val) => {
      setSstudentLabel(val);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .where("status", "==", "Student")
      .onSnapshot((querySnapshot) => {
        const nani = querySnapshot.docs.map((docSnapshot) => [
          {
            id: docSnapshot.id,
            name: docSnapshot.data().name,
            tId: docSnapshot.data().TeacherId,
          },
        ]);
        setStudentname(nani);
      });
    return unsubscribe;
  }, []);

  const YourStudents = studentname.map(function (post) {
    return post.map((hihi) => {
      if (hihi.tId == firebase.auth().currentUser.uid) {
        return (
          <MenuItem
            key={hihi.id}
            value={hihi.id}
            className={
              hihi.tId == firebase.auth().currentUser.uid ? classes.tag : ""
            }
          >
            {hihi.name}
          </MenuItem>
        );
      }
    });
  });

  const AvailableStudents = studentname.map(function (post) {
    return post.map((hihi) => {
      if (hihi.tId == null) {
        return (
          <MenuItem key={hihi.id} value={hihi.id}>
            {hihi.name}
          </MenuItem>
        );
      }
    });
  });

  if (!status) {
    return (
      <div className={stayl.loader}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item lg={3} md={3} xs={12}>
          <Card className={classes.root}>
            <Avatar aria-label="Profile" className={classes.avatar}>
              <PermIdentityIcon />
            </Avatar>
            <CardContent>
              <Typography variant="h5">Hello, {name}</Typography>
              <Typography component="body1" variant="paragraph">
                Status :{" "}
              </Typography>
              <Typography component="body1" variant="paragraph">
                {status} <br />
              </Typography>
              <Typography component="body1" variant="paragraph">
                Address :{" "}
              </Typography>
              <Typography component="body1" variant="paragraph">
                {address} <br />
              </Typography>
              <Typography component="body1" variant="paragraph">
                Student :{" "}
              </Typography>
              <Typography component="body1" variant="paragraph">
                {studentLabel ? studentLabel : "N/A"} <br />
              </Typography>
              <Typography variant="body2">Select a Student: </Typography>
              <SimpleSelect />
              <Typography variant="body2">
                <Button
                  onClick={onConfirm}
                  fullWidth
                  size="small"
                  color="primary"
                  variant="outlined"
                >
                  Confirm
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={9} md={9} xs={12}>
          <Card>
            <CardContent>
              <Paper className={[classes.paper2, "ojojo"].join(" ")}>
                {id === "null" ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">
                      {" "}
                      Please Select a Student{" "}
                    </Typography>
                  </div>
                ) : (
                  <>
                    <CardHeader
                      className={classes.CardHeader}
                      avatar={
                        <Avatar
                          aria-label="profile"
                          className={classes.avatar2}
                        >
                          <PersonIcon />
                        </Avatar>
                      }
                      title={studentLabel}
                      subheader="Overview"
                    />
                    <Divider />
                    <Grid container>
                      <Grid item lg={3} md={3} xs={12}>
                        <Paper className={classes.paper3}>
                          <CardContent
                            style={{
                              marginTop: "30px",
                              alignItems: "justify",
                            }}
                          >
                            <Typography color="textSecondary" variant="h5">
                              Profile
                            </Typography>

                            <Typography component="body1" variant="paragraph">
                              Lessons :{" "}
                            </Typography>
                            <Typography
                              component="body1"
                              variant="paragraph"
                              color="textSecondary"
                            >
                              {!total ? "N/A" : total}
                              <br />
                            </Typography>
                            <Typography
                              component="body1"
                              variant="paragraph"
                              fontWeight="light"
                            >
                              Assignments :{" "}
                            </Typography>
                            <Typography
                              component="body1"
                              variant="paragraph"
                              color="textSecondary"
                            >
                              {!assignmentSize ? "N/A" : assignmentSize}
                              <br />
                            </Typography>
                            <Typography component="body1" variant="paragraph">
                              Quizzes :{" "}
                            </Typography>
                            <Typography
                              component="body1"
                              variant="paragraph"
                              color="textSecondary"
                            >
                              {!quiz ? "N/A" : quiz} <br />
                            </Typography>
                          </CardContent>
                        </Paper>
                      </Grid>
                      <Grid item lg={8} md={8} xs={12}>
                        <Paper
                          className={[fixedHeightPaper, "ojojo"].join(" ")}
                        >
                          <Chart name={studentLabel} />
                        </Paper>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box pt={2}>{copy}</Box>
    </Container>
  );
  async function getAddress() {
    try {
      const address = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();
      return address.get("address");
    } catch (error) {}
  }
  async function getStudentName() {
    try {
      const address = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();
      return address.get("StudentName");
    } catch (error) {}
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
  function SimpleSelect() {
    // const classes = useStyles();
    const handleChange = (event) => {
      const { innerText } = event.nativeEvent.target;
      setStudent(event.target.value);
      setSstudentLabel(innerText);
    };
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">
            {studentLabel ? studentLabel : "Student"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={student}
            // disabled={studentLabel ? "disabled" : ""}
            onChange={handleChange}
          >
            <MenuItem disabled="disabled">
              <em> Your Students</em>
            </MenuItem>

            {YourStudents}
            <MenuItem disabled="disabled">
              <em> Available Students</em>
            </MenuItem>
            {AvailableStudents}
          </Select>
          {studentLabel ? (
            <FormHelperText>You have selected this student</FormHelperText>
          ) : (
            <FormHelperText> Select your student</FormHelperText>
          )}
        </FormControl>
      </div>
    );
  }
  async function onConfirm() {
    try {
      await addStudent(student, studentLabel);
      await addTeacher2Student(firebase.auth().currentUser.uid, name);
      alert("Student Selected");
    } catch (error) {
      alert(error.message);
    }
  }
  async function addStudent() {
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }

      return firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set(
          {
            StudentId: student,
            StudentName: studentLabel,
          },
          { merge: true }
        );
    } catch (error) {
      alert(error.message);
    }
  }
  async function addTeacher2Student() {
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }

      return firebase.firestore().collection("users").doc(student).set(
        {
          TeacherId: firebase.auth().currentUser.uid,
          TeacherName: name,
        },
        { merge: true }
      );
    } catch (error) {
      alert(error.message);
    }
  }
}
