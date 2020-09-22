import React, { useState, useEffect } from "react";
import clsx from "clsx";
import stayl from "./dash.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Switche from "./themeSwitch";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  Profile,
  Assingment,
  Lessons,
  Quiz,
  secondaryListItems,
} from "../dashitems";
import {  blue } from "@material-ui/core/colors";
import { withRouter } from "react-router-dom";
import Teacher from "./Teacher";
import LinkLess from "./Lessons";
import LinkQui from "./Quiz";
import LinkAss from "./Assignment";
import Student from "./Student";
import firebase from "../firebase";

// For Switch Theming
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
    border: "none",
    // width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      // width: theme.spacing(9),
      width: 0,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  sa: {
    marginTop: "-20px",
  },
}));

function Dashboard(props) {
  const name =
    firebase.auth().currentUser && firebase.auth().currentUser.displayName;
  const classes = useStyles();
  const [switchState, setSwitchState] = useState(false);
  const [darkState, setDarkState] = useState("light");
  const [mainPrimaryColor, setMainPrimaryColor] = useState(() => {
    const existingPreference = localStorage.getItem("color");
    if (!existingPreference) {
      return blue[800];
    } else {
      return localStorage.getItem("color") || "";
    }
  });
  const [student, setStudent] = useState(" ");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        setStudent(querySnapshot.data().StudentId);
      });
    return unsubscribe;
  }, []);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  const [page, setPage] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: darkState,
      primary: {
        main: mainPrimaryColor,
      },
    },
  });

  useEffect(() => {
    const existingPreference = localStorage.getItem("darkState");
    if (existingPreference) {
      existingPreference === "light"
        ? setDarkState("light")
        : setDarkState("dark");
    } else {
      setDarkState("light");
      localStorage.setItem("darkState", "light");
    }
  }, []);

  const handleThemeChange = () => {
    setSwitchState(switchState === true ? false : true);
    if (darkState === "light") {
      setDarkState("dark");
      setMainPrimaryColor(blue[400]);
      localStorage.setItem("color", blue[400]);
      localStorage.setItem("darkState", "dark");
    } else {
      setDarkState("light");
      setMainPrimaryColor(blue[800]);
      localStorage.setItem("color", blue[800]);
      localStorage.setItem("darkState", "light");
    }
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getStatus().then((val) => {
      setStatus(val);
    });
  }, []);

  if (!name) {
    alert("Please login first");
    props.history.replace("/login");
    return null;
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            ></Typography>
            <IconButton
              onClick={() => {
                handleThemeChange();
              }}
            >
              <Switche checked={darkState} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerOpen}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => setPage()}>
              {Profile}
            </ListItem>
            <ListItem
              button
              onClick={() =>
                setPage(<LinkLess id={student} copy={<Copyright />} />)
              }
            >
              {Lessons}
            </ListItem>
            <ListItem
              button
              onClick={() =>
                setPage(<LinkAss id={student} copy={<Copyright />} />)
              }
            >
              {Assingment}
            </ListItem>
            <ListItem
              button
              onClick={() =>
                setPage(<LinkQui id={student} copy={<Copyright />} />)
              }
            >
              {Quiz}
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main
          className={
            darkState === "dark"
              ? [classes.content, stayl.nani].join(" ")
              : [classes.content, stayl.nani, stayl.wawo].join(" ")
          }
        >
          <div className={classes.appBarSpacer} />

          {status ? (
            status === "Teacher" ? (
              !page ? (
                <>
                  {" "}
                  <Teacher id={student} copy={<Copyright />} />{" "}
                </>
              ) : (
                page
              )
            ) : !page ? (
              <>
                <Student copy={<Copyright />} />
              </>
            ) : (
              page
            )
          ) : (
            <div id="loader">Fetching Data...</div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
  async function logout() {
    await firebase.auth().signOut();
    props.history.push("/");
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
  function Copyright() {
    return (
      <Typography
        style={{ marginBottom: "-15px" }}
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {"Copyright © "}
        <Link color="inherit" href="zimainternational.netlify.app">
          Solucion.ph
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    );
  }
}

export default withRouter(Dashboard);
