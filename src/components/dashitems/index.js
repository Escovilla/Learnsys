import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NoteIcon from "@material-ui/icons/Note";
import NotesIcon from "@material-ui/icons/Notes";
import { Button } from "@material-ui/core";

export const Profile = (
  <>
    <ListItemIcon active>
      <AccountCircleIcon />
    </ListItemIcon>
    <ListItemText primary="Home" />
  </>
);
export const Lessons = (
  <>
    <ListItemIcon>
      <NoteIcon />
    </ListItemIcon>
    <ListItemText primary="Lessons" />
  </>
);
export const Assingment = (
  <>
    <ListItemIcon>
      <NotesIcon />
    </ListItemIcon>
    <ListItemText primary="Assingment" />
  </>
);
export const Quiz = (
  <>
    <ListItemIcon>
      <LayersIcon />
    </ListItemIcon>
    <ListItemText primary="Quiz" />
  </>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Results</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Quiz 1" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Quiz 2" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Quiz 3" />
    </ListItem>
  </div>
);
