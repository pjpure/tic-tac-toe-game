import React, { useState } from "react";
import { Wrapper } from "./Board.styles";
import { GrPowerReset } from "react-icons/gr";

const createArray = (size: number) => {
  const array = [];
  for (let i = 0; i < size * size; i++) {
    array.push("");
  }
  return array;
};

function Board() {
  const [size, setSize] = useState(3);
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
    <Wrapper size={size}>
      <div className="header">
        <div className="logo">
          <span style={{ color: "#30c3be" }}>X</span>
          <span style={{ color: "#f2b237" }}>O</span>
        </div>
        <div className="turn">{isX ? "X" : "O"} TURN</div>
        <div className="reset">
          <GrPowerReset />
        </div>
      </div>
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
    </Wrapper>
  );
}

export default Board;
