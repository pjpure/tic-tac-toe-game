import "./EndGame.css";

function EndGame({
  playerStatus,
  handlePlayAgain,
  handleQuit,
}: {
  playerStatus?: "win" | "lose" | "draw" | "";
  handlePlayAgain: () => void;
  handleQuit: () => void;
}) {
  return (
    <div className="end-game">
      <div className="content">
        {playerStatus === "win" ? (
          <h1>You Win</h1>
        ) : playerStatus === "lose" ? (
          <h1>You Lose</h1>
        ) : (
          <h1>Draw</h1>
        )}
        <div className="btn-box">
          <button id="play-btn" onClick={handlePlayAgain}>
            Play again
          </button>
          <button id="quit-btn" onClick={handleQuit}>
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndGame;
