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

function PlayGame() {
  const room = useAppSelector((state) => state.room);
  const player = useAppSelector((state) => state.player);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [board, setBoard] = useState<string[]>([]);
  const [isTurn, setIsTurn] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [symbol, setSymbol] = useState("X");

  useEffect(() => {
    socket.on("game:start", ({ player, board }) => {
      setBoard(board);
      setIsStart(true);
      setIsTurn(player.isTurn);
      setSymbol(player.symbol);
    });
    socket.on("game:updated", ({ board, player }) => {
      setBoard(board);
      setIsTurn(player.isTurn);
    });
  }, []);

  useEffect(() => {
    if (!room.id) {
      navigate("/");
    }
  }, [room.id, navigate]);

  const handleBoardClick = (idx: number) => {
    if (board[idx] === "" && isTurn) {
      socket.emit("game:update", { roomId: room.id, idx });
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
      <Wrapper size={Math.sqrt(board.length)} isTurn={isTurn}>
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
