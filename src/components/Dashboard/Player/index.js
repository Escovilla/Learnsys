import ReactPlayer from "react-player";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";

export default function Player(props) {
  const { url } = props;

  return !url ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <div className="player-wrapper">
      <ReactPlayer
        url={url}
        className="react-player"
        volume={1}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
}
