import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayGame from "./pages/PlayGame/PlayGame";
import JoinGame from "./pages/JoinGame/JoinGame";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/play" element={<PlayGame />} />
          <Route path="/" element={<JoinGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
