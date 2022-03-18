import { useEffect } from "react";
import "./PlayGame.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import socket from "../../services/SocketService";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { setRoom, setStatus, leaveRoom } from "../../store/slices/RoomSlice";
import { Wrapper } from "./Board.styles";
import WaitPlayer from "../../components/WaitPlayer/WaitPlayer";
import useGame from "../../hooks/useGame";
import { BsFlagFill } from "react-icons/bs";
import EndGame from "../../components/EndGame/EndGame";

function PlayGame() {
  const room = useAppSelector((state) => state.room);
  const player = useAppSelector((state) => state.player);
  const { board, status, isTurn, symbol, playerStatus } = useGame(socket.id);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("game:start", (roomId, room) => {
      dispatch(setRoom({ ...room, id: roomId }));
    });
    socket.on("game:updated", (roomId, room) => {
      dispatch(setRoom({ ...room, id: roomId }));
    });
    socket.on("game:wait", () => {
      dispatch(setStatus("waiting"));
    });
  }, [dispatch]);

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

  const handleLeaveRoom = () => {
    if (window.confirm("Are you sure you want to leave the room?")) {
      socket.emit("room:leave", { playerName: player.name, roomId: room.id });
      dispatch(leaveRoom());
      navigate("/");
    }
  };

  const handleGiveUp = () => {
    if (window.confirm("Are you sure you want to give up?")) {
      socket.emit("game:giveUp", { roomId: room.id });
    }
  };

  const handlePlayAgain = () => {
    socket.emit("game:playAgain", { roomId: room.id });
  };

  return (
    <div className="play-game">
      {status === "waiting" && room.id && <WaitPlayer roomId={room.id} />}
      {status === "ended" && (
        <EndGame
          playerStatus={playerStatus}
          handlePlayAgain={handlePlayAgain}
          handleQuit={handleLeaveRoom}
        />
      )}
      <BackButton handleBackClick={handleLeaveRoom} />
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
          <div className="give-up">
            <BsFlagFill onClick={handleGiveUp} />
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
                  cell === "X"
                    ? { color: "#30c3be" }
                    : cell === "O"
                    ? { color: "#f2b237" }
                    : cell === "WX"
                    ? { backgroundColor: "#30c3be" }
                    : cell === "WO"
                    ? { backgroundColor: "#f2b237" }
                    : {}
                }
              >
                {cell === "X" || cell === "WX"
                  ? "X"
                  : cell === "O" || cell === "WO"
                  ? "O"
                  : ""}
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
            <span>God: </span>
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
