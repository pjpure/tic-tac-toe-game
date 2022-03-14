import Board from "../../components/Board/Board";
import "./PlayGame.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import socket from "../../services/SocketService";
import { useAppSelector } from "../../hooks/useRedux";
function PlayGame() {
  const room = useAppSelector((state) => state.room);
  const player = useAppSelector((state) => state.player);
  const navigate = useNavigate();

  const handleBackClick = () => {
    console.log(player.name);
    socket.emit("room:leave", { playerName: player.name, roomId: room.id });
    navigate("/");
  };

  return (
    <div className="play-game">
      <BackButton handleBackClick={handleBackClick} />
      <Board />
    </div>
  );
}

export default PlayGame;
