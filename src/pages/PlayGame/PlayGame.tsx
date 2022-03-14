import { useState, useEffect } from "react";
import "./PlayGame.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import socket from "../../services/SocketService";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { leaveRoom } from "../../store/slices/RoomSlice";
import { Wrapper } from "./Board.styles";
import { GrPowerReset } from "react-icons/gr";
import WaitPlayer from "../../components/WaitPlayer/WaitPlayer";

const createArray = (size: number) => {
  const array = [];
  for (let i = 0; i < size * size; i++) {
    array.push("");
  }
  return array;
};

function PlayGame() {
  const room = useAppSelector((state) => state.room);
  const player = useAppSelector((state) => state.player);
  const [board, setBoard] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isTurn, setIsTurn] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [symbol, setSymbol] = useState("X");

  useEffect(() => {
    setBoard(createArray(room.boardSize));
  }, [room.boardSize]);

  useEffect(() => {
    if (!room.id) {
      navigate("/");
    }
  }, [room.id, navigate]);

  const handleBoardClick = (index: number) => {
    if (board[index] === "" && isTurn) {
      const newBoards = [...board];
      newBoards[index] = symbol;
      setBoard(newBoards);
    }
  };

  const handleBackClick = () => {
    socket.emit("room:leave", { playerName: player.name, roomId: room.id });
    dispatch(leaveRoom());
    navigate("/");
  };

  return (
    <div className="play-game">
      {!isStart && <WaitPlayer roomId={room.id} />}
      <BackButton handleBackClick={handleBackClick} />
      <Wrapper size={room.boardSize} isTurn={isTurn}>
        <div className="header">
          <div className="logo">
            <span style={{ color: "#30c3be" }}>X</span>
            <span style={{ color: "#f2b237" }}>O</span>
          </div>
          <div className="turn">
            {(isTurn && symbol === "X") || (!isTurn && symbol === "O")
              ? "X"
              : "O"}{" "}
            TURN
          </div>
          <div className="reset">
            <GrPowerReset />
          </div>
        </div>
        <div className="board">
          {board.map((cell, index) => {
            return (
              <div
                onClick={() => {
                  handleBoardClick(index);
                }}
                className="cell"
                key={index}
                style={
                  cell === "X" ? { color: "#30c3be" } : { color: "#f2b237" }
                }
              >
                {cell}
              </div>
            );
          })}
        </div>
        <div className="footer">
          <div className="">You</div>
          <div className="">{room.id}</div>
          <div className="">3</div>
        </div>
      </Wrapper>
    </div>
  );
}

export default PlayGame;
