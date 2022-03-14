import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../services/SocketService";
import "./JoinGame.css";
import BackButton from "../../components/BackButton/BackButton";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { setRoom } from "../../store/slices/RoomSlice";

function JoinGame() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const player = useAppSelector((state) => state.player);

  const dispatch = useAppDispatch();

  const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleJoinGame = () => {
    socket.emit("room:join", { playerName: player.name, roomId });
    socket.on("room:joined", (room) => {
      dispatch(setRoom(room));
      navigate(`/game`);
    });
    socket.on("room:notFound", () => {
      alert("Room not found");
    });

    socket.on("room:full", () => {
      alert("Room is full");
    });
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
