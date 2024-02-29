"use client";

import useBoardStore from "@/store/BoardStore";
import React, { useEffect } from "react";
import Column from "./Column";

const Board = () => {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <div className="grid grid-cols-3 mx-auto gap-5 p-10 drop-shadow-lg">
      {Array.from(board.columns.entries()).map(
        ([typedColumn, column], index) => (
          <Column
            key={typedColumn}
            id={typedColumn}
            todos={column.todos}
            index={index}
          />
        )
      )}
    </div>
  );
};

export default Board;
