import React from "react";
import firebase from "../firebase";
import { Typography, Paper, Avatar, Button } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import Buga from "./buga.png";
const wa = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#3d5afe",
      was: "#d500f9",
    },
  },
});
const styles = (theme) => ({
  body: {
    minHeight: "100vh",
    maxHeight: "auto",
    width: "100vw",
    backgroundColor: "#2A3439",
  },
  main: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid black",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: wa.palette.secondary.was,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: wa.palette.secondary.main,
  },
  center: {
    justifyContent: "center",
  },
  smol: {
    margin: theme.spacing.unit,
    height: "100px",
  },
  spacing: {
    margin: theme.spacing.unit,
  },
});

function HomePage(props) {
  const { classes } = props;
  const name =
    firebase.auth().currentUser && firebase.auth().currentUser.displayName;
  if (name) {
    props.history.replace("/Dashboard");
  }
  return (
    <div className={classes.body}>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <img className={classes.smol} src={Buga} />

          <Typography
            style={{
              color: "#2A3439",
              fontWeight: "900",
              fontFamily: "sans-serif",
              letterSpacing: "-5px",
            }}
            component="h1"
            variant="h3"
          >
            LearnSys
          </Typography>
          <p className={classes.spacing}>Learning system for Ica</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="/register"
            className={classes.submit}
          >
            Register
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            className={classes.submit}
          >
            Login
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="/dashboard"
            className={classes.submit}
          >
            Dashboard
          </Button>
        </Paper>
        <div>Solucion.ph</div>
      </main>
    </div>
  );
}

export default withStyles(styles)(HomePage);
