import Board from "../../components/Board/Board";
import "./PlayGame.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function PlayGame() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/");
  };
  return (
    <div className="play-game">
      <div onClick={handleBackClick} className="play-game-back">
        <BiArrowBack size={40} />
      </div>

      <Board />
    </div>
  );
}

export default PlayGame;
