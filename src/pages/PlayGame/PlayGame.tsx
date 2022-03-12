import Board from "../../components/Board/Board";
import "./PlayGame.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";

function PlayGame() {
  const navigate = useNavigate();
  const handleBackClick = () => {
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
