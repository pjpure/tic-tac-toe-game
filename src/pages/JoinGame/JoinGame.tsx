import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocketService from "../../services/SocketService";
import "./JoinGame.css";
import BackButton from "../../components/BackButton/BackButton";
function JoinGame() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleJoinGame = () => {
    const socket = SocketService();
    socket.emit("room:create", roomId);
    navigate(`/play`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="join-game">
      <BackButton handleBackClick={handleBackClick} />
      <h1>Enter Room ID to Join the Game</h1>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={handleRoomIdChange}
      />
      <div className="join-game-btn">
        <button onClick={handleJoinGame}>Join</button>
      </div>
    </div>
  );
}

export default JoinGame;
