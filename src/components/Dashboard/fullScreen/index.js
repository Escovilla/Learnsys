import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
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
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const { data } = props;
  const { title } = props;
  const { body } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" size="small" onClick={handleClickOpen}>
        Open full-screen
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            ></IconButton>
            <Typography variant="h6" className={classes.title} color="default">
              {""}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid lg={7} md={7} xs={12} container spacing={0}>
            <Grid item lg={12} md={12} xs={12}>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                {" "}
                <Typography variant="h5"> {title}</Typography>
              </div>
              {data}
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Typography variant="b1"> {body}</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
