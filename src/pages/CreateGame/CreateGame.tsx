import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import socket from "../../services/SocketService";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { setRoom } from "../../store/slices/RoomSlice";
import "./CreateGame.css";

function CreateGame() {
  const player = useAppSelector((state) => state.player);
  const [boardSize, setBoardSize] = useState(3);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleCreateGame = () => {
    socket.emit("room:create", player.name, boardSize);
    socket.on("room:created", (roomId: string) => {
      dispatch(setRoom({ id: roomId, boardSize }));
      navigate("/game");
    });
  };

  const handleSelectBoardSize = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBoardSize(parseInt(event.target.value));
  };

  useEffect(() => {
    if (!player.name) {
      navigate("/");
    }
  }, [player.name, navigate]);

  return (
    <div className="create-game">
      <BackButton handleBackClick={handleBackClick} />
      <label>Choose a board size: </label>
      <select
        name="board"
        id="board"
        value={boardSize}
        onChange={handleSelectBoardSize}
      >
        <option value={3}>3x3</option>
        <option value={4}>4x4</option>
        <option value={5}>5x5</option>
        <option value={6}>6x6</option>
      </select>
      <br />
      <button onClick={handleCreateGame}>Create</button>
    </div>
  );
}

export default CreateGame;
