import React from "react";
import "./WaitPlayer.css";
function WaitPlayer({ roomId }: { roomId: string }) {
  return (
    <div className="wait-player">
      <div className="content">
        <h1>Waiting for Other Player to Join...</h1>
        <h2>Room ID: {roomId}</h2>
      </div>
    </div>
  );
}

export default WaitPlayer;
