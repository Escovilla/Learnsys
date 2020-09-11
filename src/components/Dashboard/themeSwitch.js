import React from "react";
import Fab from "@material-ui/core/Fab";
import { Brightness4Rounded } from "@material-ui/icons";
import Brightness7Icon from "@material-ui/icons/Brightness7";
export default function ThemeIndicator(props) {
  let { checked } = props;

  const displayAlt = checked ? "Switch to Light Mode" : "Switch to Dark Mode";

  if (checked === "dark") {
    return (
      <Fab
        size="small"
        aria-label={displayAlt}
        style={{ color: "#42a5f5", background: "#303030", boxShadow: "none" }}
      >
        <Brightness4Rounded />
      </Fab>
    );
  } else {
    return (
      <Fab
        size="small"
        aria-label={displayAlt}
        style={{ background: "white", color: "#1565c0", boxShadow: "none" }}
      >
        <Brightness7Icon />
      </Fab>
    );
  }
}
