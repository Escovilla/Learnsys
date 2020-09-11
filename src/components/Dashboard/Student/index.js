import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Box from "@material-ui/core/Box";
import { Avatar, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import firebase from "../../firebase";
import { CircularProgress } from "@material-ui/core";
import stayl from "../dash.module.css";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  paper: {
    padding: theme.spacing(2),
    adjustItems: "justify",
    // alignItems: "center",
    minHeight: 240,
    maxHeight: "auto",
    width: "auto",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  ajustible: {
    maxHeight: "auto",
  },
  avatar: {
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "20px",
    backgroundColor: "lightblue",
  },
}));
export default function Student() {
  const classes = useStyles();
  const name =
    firebase.auth().currentUser && firebase.auth().currentUser.displayName;
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    getStatus().then((val) => {
      setStatus(val);
    });
    getAddress().then((val) => {
      setAddress(val);
    });
  }, []);
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
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PermIdentityIcon />
            </Avatar>
            <Typography variant="h5">Hello, {name}</Typography>
            <Typography variant="body1">Status : {status}</Typography>
            <Typography variant="body1">Address : {address}</Typography>
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={classes.paper}></Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>{/* <Orders /> */}</Paper>
        </Grid>
      </Grid>
      <Box pt={4}>{/* <Copyright /> */}</Box>
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
