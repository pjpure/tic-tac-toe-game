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

  const [board, setBoard] = useState<string[]>(room.board);
  const [isTurn, setIsTurn] = useState(false);
  const [isPlay, setIsPlay] = useState(room.isPlay);
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    socket.on("game:start", (room) => {
      let myData = room.players.find((p: any) => p.id === socket.id);
      setBoard(room.board);
      setIsPlay(true);
      setIsTurn(myData.isTurn);
      setSymbol(myData.symbol);
    });
    socket.on("game:updated", ({ board, player }) => {
      setBoard(board);
      setIsPlay(true);
      setIsTurn(player.isTurn);
    });
    socket.on("game:end", () => {
      setIsPlay(false);
    });
  }, []);

  useEffect(() => {
    if (!room.id) {
      navigate("/");
    }
  }, [room.id, navigate]);

  const handleBoardClick = (idx: number) => {
    if (board[idx] === "" && isTurn) {
      setIsTurn(false);
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
      {!isPlay && <WaitPlayer roomId={room.id} />}
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
          <div>
            <span>You: </span>
            <span
              style={
                symbol === "X" ? { color: "#30c3be" } : { color: "#f2b237" }
              }
            >
              {symbol}
            </span>
          </div>
          <div>
            <span>Yuo: </span>
            <span
              style={
                symbol === "X" ? { color: "#f2b237" } : { color: "#30c3be" }
              }
            >
              {symbol === "X" ? "O" : "X"}
            </span>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default PlayGame;
