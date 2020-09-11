import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Card,
  CardContent,
  Paper,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import "../../App/style.css";
import { green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Player from "../Player";
import Grid from "@material-ui/core/Grid";
import AddBoxIcon from "@material-ui/icons/AddBox";
import firebase from "../../firebase";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  subtitle1: {
    fontSize: 12,
  },
  subtitle2: {
    fontSize: 22,
  },
  sub: {
    fontSize: 25,
    marginBottom: "-10px",
  },
  paper2: {
    marginTop: "27px",
    adjustItems: "right",
    border: ".5px solid gray",
    minHeight: "550px",
    padding: "10px",
    width: "auto",
    display: "flex",

    flexDirection: "column",
  },
  custom: {
    marginBottom: "-15px",
  },
  form: {
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: theme.spacing.unit,
  },
  input: {
    width: "75%",
    marginTop: "0",
  },
  inpu2: {
    width: "75%",
    marginTop: "15px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const { id } = props;
  const { title } = props;
  const { subject } = props;
  const { finalCount } = props;
  const { save } = props;

  const classes = useStyles();
  const [open, setOpen] = useState();
  const [intcount, setIntCount] = useState([]);
  const [fitb, setFitb] = useState();
  const [mc, setMc] = useState();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState(null);
  const [answerOption1, setAnswerOption1] = useState();
  const [answerOption2, setAnswerOption2] = useState();
  const [answerOption3, setAnswerOption3] = useState();
  const [choiceA, setChoiceA] = useState();
  const [choiceB, setChoiceB] = useState();
  const [choiceC, setChoiceC] = useState();
  const [choiceD, setChoiceD] = useState();
  const [questionNo, setQuestionNo] = useState();
  const [questionPrev, setQuestionPrev] = useState([]);

  const handleClickOpen = () => {
    onConfirm();
    deleyy();
  };

  const AddMultiple = () => {
    if (answer == null) {
      alert("Choose An Answer First");
    } else {
      AddMcButton();
    }
  };
  const AddFitb = () => {
    if (
      answer == null ||
      answerOption1 == null ||
      answerOption2 == null ||
      answerOption3 == null
    ) {
      alert("Add An Answer Option First");
    } else {
      AddFitbButton();
    }
  };

  const Open = () => {
    setOpen(true);
    deleyy();
  };

  const handleClose = () => {
    setOpen(false);
    setDelay(false);
  };

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
  // const delay = count == "-Infinity" ? "" : count;
  const tostr = count.toString();

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
          const QuestionNo = querySnapshot.docs.map(
            (docSnapshot) => docSnapshot.id
          );
          setQuestionNo(QuestionNo);
          const QuestionPrev = querySnapshot.docs.map((docSnapshot) => [
            { id: docSnapshot.id, data: docSnapshot.data() },
          ]);
          setQuestionPrev(QuestionPrev);
        });

      return unsubscribe;
    }
  }, [tostr]);

  const counterr = Math.max.apply(Math, questionNo);
  const tester = counterr == "-Infinity" ? "" : counterr;
  const fqn = tester + 1;
  const finalQuestionNumber = fqn.toString();
  const [delay, setDelay] = useState(false);

  function deleyy() {
    const timer = setTimeout(() => {
      setDelay(true);
    }, 2000);
    return () => clearTimeout(timer);
  }
  const summaryQuiz = questionPrev.map(function (post) {
    return post.map(function (hihi) {
      const data = hihi.data;
      if (data.type === "multipleChoice") {
        return (
          <Grid item lg={12} md={12} xs={12}>
            <Grid
              item
              lg={7}
              md={7}
              xs={12}
              style={{ marginRight: "auto", marginLeft: "auto" }}
            >
              <Typography className={classes.sub}>
                {hihi.id}. {data.question}
              </Typography>
              <br />

              <Typography component="h5">
                Answer:{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {data.answer}
                </Typography>
              </Typography>
              <Typography component="h5">
                A :{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {data.choiceA}
                </Typography>
              </Typography>

              <Typography component="h5">
                B :{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {data.choiceB}
                </Typography>
              </Typography>

              <Typography component="h5">
                C :{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {data.choiceC}
                </Typography>
              </Typography>
              <Typography component="h5">
                D :{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {data.choiceD}
                </Typography>
              </Typography>
              <br />
            </Grid>
          </Grid>
        );
      }
      if (data.type === "fillInTheBlanks") {
        return (
          <Grid item lg={12} md={12} xs={12}>
            <Grid
              item
              lg={7}
              md={7}
              xs={12}
              style={{ marginRight: "auto", marginLeft: "auto" }}
            >
              <Typography className={classes.sub}>
                {hihi.id}. {data.question}
              </Typography>
              <br />
              <Typography component="h5">
                Answer :{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {data.answer}
                </Typography>
              </Typography>
              <Typography component="h5">
                Answer Option 1 :{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {data.answerOption1}
                </Typography>
              </Typography>
              <Typography component="h5">
                Answer Option 2 :{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {data.answerOption2}
                </Typography>
              </Typography>
              <Typography component="h5">
                Answer Option 3 :{" "}
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  {data.answerOption3}
                </Typography>
              </Typography>
              <br />
            </Grid>
          </Grid>
        );
      }
    });
  });
  // console.log("QuestionPrev:", questionPrev, "summaryQuiz:", summaryQuiz);
  return (
    <div className="ojojo">
      {save == "save" ? (
        <Button
          type="submit"
          style={{
            float: "right",
            marginTop: "20px",
            marginBottom: "30px",
          }}
          disabled={
            subject == null || title == undefined || id === "null"
              ? true
              : false
          }
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          {id === "null"
            ? "Please Select a Student"
            : subject == null || title == undefined
            ? "Incomplete Form"
            : "Save"}
        </Button>
      ) : (
        <Button
          type="submit"
          style={{
            float: "right",
            marginTop: "20px",
            marginBottom: "30px",
          }}
          disabled={id === "null" ? true : false}
          variant="contained"
          color="primary"
          onClick={Open}
        >
          {id === "null" ? "Please Select a Student" : "continue"}
        </Button>
      )}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className="ojojo"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            ></IconButton>
            <h1
              className={classes.title}
              color="inherit"
              style={{ fontWeight: "500" }}
            >
              Quiz No. {count}
            </h1>
            <Button autoFocus color="inherit" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={0}
          lg={12}
          md={12}
          xs={12}
          style={{ padding: "10px" }}
          className="ojojo"
        >
          <Grid item lg={4} md={4} xs={12} style={{ padding: "10px" }}>
            <div className={[classes.paper2, "ojojo"].join(" ")}>
              <form
                className={classes.form}
                style={{ marginTop: "20px" }}
                onSubmit={(e) => e.preventDefault() && false}
              >
                <Typography variant="h5"> Add Quiz </Typography>
                <Typography component="body1" variant="paragraph">
                  Title:
                </Typography>
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  n/a <br />
                </Typography>
                <Typography component="body1" variant="paragraph">
                  Subject:
                </Typography>
                <Typography
                  component="body1"
                  variant="paragraph"
                  color="textSecondary"
                >
                  n/a <br />
                </Typography>
                <FormControl
                  margin="normal"
                  required
                  fullWidth
                  className={classes.custom}
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup row aria-label="Type">
                    <FormControlLabel
                      value="fitb"
                      onClick={() => {
                        setFitb(true);
                        setMc(false);
                      }}
                      control={<Radio color="primary" />}
                      label="Fill in the Blanks"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="mc"
                      onClick={() => {
                        setMc(true);
                        setFitb(false);
                      }}
                      control={<Radio color="primary" />}
                      label="Multiple Choice"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                  <Typography
                    className={classes.subtitle1}
                    color="textSecondary"
                  >
                    {fitb === false || mc === false
                      ? ""
                      : "*Select a type of Question"}
                  </Typography>
                </FormControl>

                {mc == true ? (
                  <div className={classes.subtitle2}>
                    <Typography variant="b1">
                      Question no. {finalQuestionNumber}
                    </Typography>
                    <br />
                    <Typography
                      className={classes.subtitle1}
                      color="textSecondary"
                    >
                      *Check the checkbox for the correct answer
                    </Typography>
                    <RadioGroup>
                      <div
                        style={{ textAlign: "center", alignItems: "center" }}
                      >
                        <FormControl
                          margin="normal"
                          required
                          fullWidth
                          className={classes.inpu2}
                          style={{ marginLeft: "-5px" }}
                        >
                          <InputLabel htmlFor="Question">Question</InputLabel>
                          <Input
                            id="Question"
                            name="Question"
                            autoComplete="off"
                            onChange={(e) => setQuestion(e.target.value)}
                          />
                        </FormControl>
                      </div>
                      <div>
                        <Radio
                          color="primary"
                          value="A"
                          name="A"
                          style={{ marginTop: "15px" }}
                          onClick={(e) => setAnswer(e.target.value)}
                        />
                        <FormControl
                          margin="normal"
                          required
                          fullWidth
                          className={classes.input}
                        >
                          <InputLabel htmlFor="Question">Choice A</InputLabel>

                          <Input
                            id="Choice A"
                            name="Choice A"
                            autoComplete="off"
                            onChange={(e) => setChoiceA(e.target.value)}
                          />
                        </FormControl>
                      </div>
                      <div>
                        <Radio
                          color="primary"
                          value="B"
                          name="B"
                          style={{ marginTop: "15px" }}
                          onClick={(e) => setAnswer(e.target.value)}
                        />
                        <FormControl
                          margin="normal"
                          required
                          fullWidth
                          className={classes.input}
                        >
                          <InputLabel htmlFor="Question">Choice B</InputLabel>

                          <Input
                            id="Choice B"
                            name="Choice B"
                            autoComplete="off"
                            onChange={(e) => setChoiceB(e.target.value)}
                          />
                        </FormControl>
                      </div>
                      <div>
                        <Radio
                          color="primary"
                          value="C"
                          name="C"
                          style={{ marginTop: "15px" }}
                          onClick={(e) => setAnswer(e.target.value)}
                        />
                        <FormControl
                          margin="normal"
                          required
                          fullWidth
                          className={classes.input}
                        >
                          <InputLabel htmlFor="Question">Choice C</InputLabel>

                          <Input
                            id="Choice C"
                            name="Choice C"
                            autoComplete="off"
                            onChange={(e) => setChoiceC(e.target.value)}
                          />
                        </FormControl>
                      </div>
                      <div>
                        <Radio
                          color="primary"
                          value="D"
                          name="D"
                          style={{ marginTop: "15px" }}
                          onClick={(e) => setAnswer(e.target.value)}
                        />
                        <FormControl
                          margin="normal"
                          required
                          fullWidth
                          className={classes.input}
                        >
                          <InputLabel htmlFor="Question">Choice D</InputLabel>

                          <Input
                            id="Choice D"
                            name="Choice D"
                            autoComplete="off"
                            onChange={(e) => setChoiceD(e.target.value)}
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          style={{
                            float: "right",
                            marginTop: "20px",
                            marginBottom: "30px",
                          }}
                          variant="contained"
                          color="primary"
                          onClick={AddMultiple}
                        >
                          Add
                        </Button>
                      </div>
                    </RadioGroup>
                  </div>
                ) : (
                  ""
                )}
                {fitb == true ? (
                  <div className={classes.subtitle2}>
                    <Typography variant="b1">
                      Question no. {finalQuestionNumber}
                    </Typography>
                    <br />
                    <Typography
                      className={classes.subtitle1}
                      color="textSecondary"
                    >
                      *Add answer options like all uppercase or lowercase
                      letters
                    </Typography>
                    <div style={{ textAlign: "center", alignItems: "center" }}>
                      <FormControl
                        margin="normal"
                        required
                        fullWidth
                        className={classes.input}
                        style={{ marginTop: "10px" }}
                      >
                        <InputLabel htmlFor="Question">Question</InputLabel>
                        <Input
                          id="Question"
                          name="Question"
                          autoComplete="off"
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                      </FormControl>
                      <FormControl
                        margin="normal"
                        required
                        fullWidth
                        className={classes.inpu2}
                        style={{ marginTop: "0px" }}
                      >
                        <InputLabel htmlFor="Question">Answer</InputLabel>
                        <Input
                          id="Answer"
                          name="Answer"
                          autoComplete="off"
                          onChange={(e) => setAnswer(e.target.value)}
                        />
                      </FormControl>
                      <FormControl
                        margin="normal"
                        required
                        fullWidth
                        className={classes.inpu2}
                        style={{ marginTop: "0px" }}
                      >
                        <InputLabel htmlFor="Question">
                          Answer Option 1
                        </InputLabel>
                        <Input
                          id="Answer Option 1"
                          name="Answer Option 1"
                          autoComplete="off"
                          onChange={(e) => setAnswerOption1(e.target.value)}
                        />
                      </FormControl>
                      <FormControl
                        margin="normal"
                        required
                        fullWidth
                        className={classes.inpu2}
                        style={{ marginTop: "0px" }}
                      >
                        <InputLabel htmlFor="Question">
                          Answer Option 2
                        </InputLabel>
                        <Input
                          id="Answer Option 2"
                          name="Answer Option 2"
                          autoComplete="off"
                          onChange={(e) => setAnswerOption2(e.target.value)}
                        />
                      </FormControl>
                      <FormControl
                        margin="normal"
                        required
                        fullWidth
                        className={classes.inpu2}
                        style={{ marginTop: "0px" }}
                      >
                        <InputLabel htmlFor="Question">
                          Answer Option 3
                        </InputLabel>
                        <Input
                          id="Answer Option 3"
                          name="Answer Option 3"
                          autoComplete="off"
                          onChange={(e) => setAnswerOption3(e.target.value)}
                        />
                      </FormControl>
                      <br />
                      <Button
                        type="submit"
                        style={{
                          float: "right",
                          marginTop: "20px",
                          marginBottom: "30px",
                        }}
                        variant="contained"
                        color="primary"
                        onClick={AddFitb}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </form>
            </div>
          </Grid>
          <Grid item lg={8} md={8} xs={12} style={{ padding: "10px" }}>
            <div className={[classes.paper2, "ojojo"].join(" ")}>
              <Grid
                item
                lg={12}
                md={12}
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                {delay == false ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "200px",
                    }}
                    width
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  <>
                    {summaryQuiz == 0 ? (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "200px",
                        }}
                      >
                        <Typography variant="h5"> Please Add Data </Typography>
                      </div>
                    ) : (
                      <>
                        <Typography variant="h5">Quiz No. {count}</Typography>
                        <Divider
                          style={{
                            marginTop: "20px",
                            marginBottom: "30px",
                          }}
                        />
                        {summaryQuiz}
                      </>
                    )}
                  </>
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
  async function onConfirm() {
    try {
      if (subject == null || title == "") {
        alert("Error");
      } else {
        setOpen(true);
        alert("Lesson Added");
        const FieldValue = firebase.firestore.FieldValue;
        await addQuiz(subject, finalCount, title, FieldValue);
      }
    } catch (error) {
      setOpen(false);
    }
  }
  async function addQuiz() {
    const FieldValue = firebase.firestore.FieldValue;
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }

      return firebase
        .firestore()
        .collection("quiz")
        .doc(id)
        .collection("Quizzes")
        .doc(finalCount.toString())
        .set({
          quizNo: finalCount,
          title: title,
          subject: subject,
          timestamp: FieldValue.serverTimestamp(),
        });
    } catch (error) {
      // console.log(error.message);
    }
  }
  async function AddMcButton() {
    try {
      alert("Added");
      const FieldValue = firebase.firestore.FieldValue;
      await addMc(
        question,
        answer,
        choiceA,
        choiceB,
        choiceC,
        choiceD,
        FieldValue
      );
    } catch (error) {
      setOpen(false);
    }
  }
  async function AddFitbButton() {
    try {
      alert("Added");
      const FieldValue = firebase.firestore.FieldValue;
      await addFitb(
        question,
        answer,
        answerOption1,
        answerOption2,
        answerOption2,
        FieldValue
      );
    } catch (error) {
      setOpen(false);
    }
  }
  async function addMc() {
    const FieldValue = firebase.firestore.FieldValue;
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }

      return firebase
        .firestore()
        .collection("quiz")
        .doc(id)
        .collection("Quizzes")
        .doc(count.toString())
        .collection("questions")
        .doc(finalQuestionNumber)
        .set({
          type: "multipleChoice",
          question: question,
          answer: answer,
          choiceA: choiceA,
          choiceB: choiceB,
          choiceC: choiceC,
          choiceD: choiceD,
          timestamp: FieldValue.serverTimestamp(),
        });
    } catch (error) {
      alert(error.message);
    }
  }
  async function addFitb() {
    const FieldValue = firebase.firestore.FieldValue;
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }

      return firebase
        .firestore()
        .collection("quiz")
        .doc(id)
        .collection("Quizzes")
        .doc(count.toString())
        .collection("questions")
        .doc(finalQuestionNumber)
        .set({
          type: "fillInTheBlanks",
          question: question,
          answer: answer,
          answerOption1: answerOption1,
          answerOption2: answerOption2,
          answerOption3: answerOption3,
          timestamp: FieldValue.serverTimestamp(),
        });
    } catch (error) {
      alert(error.message);
    }
  }
}
{
  /* <Button
type="submit"
style={{
  float: "right",
  marginTop: "20px",
  marginBottom: "30px",
}}
variant="contained"
color="primary"
onClick={Save}
>
Add
</Button> */
}
