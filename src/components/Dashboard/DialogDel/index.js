import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import firebase from "../../firebase";

export default function ResponsiveDialog(props) {
  const { id } = props;
  const { idd } = props;
  const { url } = props;
  const { quiz } = props;
  const { assignment } = props;

  const [open, setOpen] = useState(false);
  const [del, setDel] = useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DeleteIcon style={{ marginRight: 30 }} onClick={handleClickOpen} />

      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Data Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure to Delete this Data <br />
            <div
              style={{
                textAlign: "center",
                color: "#5cb85c",
                marginTop: "20px",
                fontWeight: 100,
                fontSize: "30px",
              }}
            >
              {del}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() =>
              !quiz
                ? !assignment
                  ? url
                    ? deletdee(id, idd)
                    : deletdeeText(id, idd)
                  : deletdeeAss(id, idd)
                : hideconfirm(id, idd)
            }
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  async function deletdeeText(props) {
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }
      setDel("Lesson deleted");

      return firebase
        .firestore()
        .collection("lessons")
        .doc(id)
        .collection("text")
        .doc(idd)
        .delete();
    } catch (error) {
      alert(error.message);
    }
  }
  async function deletdee(props) {
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }
      setDel("Lesson deleted");

      return firebase
        .firestore()
        .collection("lessons")
        .doc(id)
        .collection("url")
        .doc(idd)
        .delete();
    } catch (error) {
      alert(error.message);
    }
  }
  async function deletdeeAss(props) {
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }
      setDel("Assignment deleted");

      return firebase
        .firestore()
        .collection("assignment")
        .doc(id)
        .collection("text")
        .doc(idd)
        .delete();
    } catch (error) {
      alert(error.message);
    }
  }

  async function hideconfirm(id, idd) {
    try {
      setDel("Quiz deleted");
      await hide(id, idd);
      setOpen(false);
    } catch (error) {
      setDel("Quiz Not deleted");
    }
  }
  async function hide(props) {
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }

      return firebase
        .firestore()
        .collection("quiz")
        .doc(id)
        .collection("Quizzes")
        .doc(idd)
        .set(
          {
            quizNo: null,
            status: "hide",
          },
          { merge: true }
        );
    } catch (error) {
      // console.log(error.message);
    }
  }
}
// .collection("questions")
// .doc(fqn.toString())
// .set({
//   type: "multipleChoice",
//   question: question,
//   answer: answer,
//   choiceA: choiceA,
//   choiceC: choiceB,
//   choiceC: choiceC,
//   choiceD: choiceD,
//   timestamp: FieldValue.serverTimestamp(),
