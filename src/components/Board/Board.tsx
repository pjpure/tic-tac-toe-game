import React, { useState } from "react";
import "./Board.css";

function Board() {
  const createArray = (size: number) => {
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push("");
    }
    return array;
  };

  const [boards, setBoards] = useState<string[]>(createArray(9));
  const [isX, setIsX] = useState<boolean>(true);

  const handleBoardClick = (index: number) => {
    if (boards[index] === "") {
      const newBoards = [...boards];
      if (isX) {
        newBoards[index] = "X";
      } else {
        newBoards[index] = "O";
      }
      setIsX(!isX);
      setBoards(newBoards);
    }
  };

  return (
    <div className="container">
      <div className="grid">
        {boards.map((board, index) => {
          console.log(index);
          return (
            <div
              onClick={() => {
                handleBoardClick(index);
              }}
              className="cell"
              key={index}
            >
              {board}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Board;
