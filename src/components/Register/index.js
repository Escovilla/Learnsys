import React, { useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  InputLabel,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import firebase from "../firebase";
import purple from "@material-ui/core/colors/purple";
import { createMuiTheme } from "@material-ui/core/styles";
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
    maxWidth: "100vw",
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
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: wa.palette.secondary.main,
  },
  custom: {
    marginTop: "33px",
    marginBottom: "-13px",
  },
  rdgroup: {
    alignItems: "center",
  },
  input: {
    textTransform: "capitalize",
  },
});

function Register(props) {
  const { classes } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const data = {
    name: name,
    address: address,
    status: status,
  };
  ////////////////////////////
  const [values, setValues] = useState({
    password: password,
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  ////////////////////////////
  return (
    <div className={classes.body}>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Account
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => e.preventDefault() && false}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                autoComplete="off"
                autoFocus
                className={classes.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="address">Your Address</InputLabel>
              <Input
                name="address"
                type="text"
                id="address"
                className={classes.input}
                autoComplete="off"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
            <FormControl
              margin="normal"
              required
              fullWidth
              className={classes.custom}
            >
              <FormLabel component="legend">Register as</FormLabel>
              <RadioGroup row aria-label="register as">
                <FormControlLabel
                  value="Teacher"
                  onClick={(e) => setStatus(e.target.value)}
                  control={<Radio color="primary" />}
                  label="Teacher"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Student"
                  onClick={(e) => setStatus(e.target.value)}
                  control={<Radio color="primary" />}
                  label="Student"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onRegister}
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
              Go back to Login
            </Button>
          </form>
        </Paper>
      </main>
    </div>
  );
  async function onRegister() {
    try {
      await register(name, email, password);
      await addData(data);
    } catch (error) {
      alert(error.message);
    }
  }
  async function register() {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert("Account Created");
      props.history.replace("/Login");
      return await firebase.auth().currentUser.updateProfile({
        displayName: name,
      });
    } catch (error) {
      alert(error.message);
    }
  }
  async function addData() {
    try {
      if (!firebase.auth().currentUser) {
        return alert("Not authorized");
      }

      return firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set(data);
    } catch (error) {
      alert(error.message);
    }
  }
}
export default withRouter(withStyles(styles)(Register));
