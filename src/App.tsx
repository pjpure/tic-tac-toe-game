import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayGame from "./pages/PlayGame/PlayGame";
import JoinGame from "./pages/JoinGame/JoinGame";
import Home from "./pages/Home/Home";
import CreateGame from "./pages/CreateGame/CreateGame";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/play" element={<PlayGame />} />
          <Route path="/join" element={<JoinGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
