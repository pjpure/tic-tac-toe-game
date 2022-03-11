import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./JoinGame.css";

function JoinGame() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleJoinGame = () => {
    navigate(`/play`);
  };

  return (
    <div className="join-game">
      <h2>Enter Room ID to Join the Game</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={handleRoomIdChange}
      />
      <div className="join-game-btn">
        <button onClick={handleJoinGame}>Join</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}

export default JoinGame;
