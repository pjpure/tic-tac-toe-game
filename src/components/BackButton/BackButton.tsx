import { BiArrowBack } from "react-icons/bi";
import "./BackButton.css";

function PlayGame({ handleBackClick }: { handleBackClick: () => void }) {
  return (
    <div className="back" onClick={handleBackClick}>
      <BiArrowBack size={40} />
    </div>
  );
}

export default PlayGame;
