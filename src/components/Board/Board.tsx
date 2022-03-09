import React, { useState } from "react";
import { BoardWrapper } from "./Board.styles";

const createArray = (size: number) => {
  const array = [];
  for (let i = 0; i < size * size; i++) {
    array.push("");
  }
  return array;
};

function Board() {
  const [size, setSize] = useState(5);
  const [boards, setBoards] = useState<string[]>(createArray(size));
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
    <BoardWrapper side={100} size={size}>
      <div className="board">
        {boards.map((board, index) => {
          console.log(index);
          return (
            <div
              onClick={() => {
                handleBoardClick(index);
              }}
              className="cell"
              key={index}
              style={
                board === "X" ? { color: "#30c3be" } : { color: "#f2b237" }
              }
            >
              {board}
            </div>
          );
        })}
      </div>
    </BoardWrapper>
  );
}

export default Board;
