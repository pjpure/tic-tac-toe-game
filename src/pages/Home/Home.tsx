import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { setPlayer } from "../../store/slices/PlayerSlice";
import BackButton from "../../components/BackButton/BackButton";
import "./Home.css";
function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const player = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let data = event.target.value;
    if (data === " ") {
      data = "";
    }
    setName(data);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let data = name;
    if (data === "") {
      data = "Anonymous";
    }
    dispatch(setPlayer(data));
  };

  const handleJoinGame = () => {
    navigate("/join");
  };

  const handleCreateGame = () => {
    navigate("/create");
  };

  const handleBackClick = () => {
    dispatch(setPlayer(null));
  };
  return (
    <div className="home">
      <h1>Tic Tac Toe !</h1>
      {!player.name ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
          />
          <div>
            <button type="submit">OK</button>
          </div>
        </form>
      ) : (
        <div>
          <BackButton handleBackClick={handleBackClick} />
          <div>
            <button onClick={handleCreateGame}>Create Room</button>
          </div>
          <div>
            <button onClick={handleJoinGame}>Join Room</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
