import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import socket from "../../services/SocketService";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { setRoom } from "../../store/slices/RoomSlice";

function CreateGame() {
  const player = useAppSelector((state) => state.player);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleBackClick = () => {
    navigate("/");
  };

  const handleCreateGame = () => {
    socket.emit("room:create", player.name);
  };

  const roomCreated = (roomId: string) => {
    navigate("/play");
    dispatch(setRoom(roomId));
  };

  useEffect(() => {
    // socket.on("room:created", (roomId) => {
    //   roomCreated(roomId);
    // });
  }, []);

  return (
    <div>
      <BackButton handleBackClick={handleBackClick} />
      <button onClick={handleCreateGame}>Create</button>
    </div>
  );
}

export default CreateGame;
