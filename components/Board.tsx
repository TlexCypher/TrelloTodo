"use client";

import useBoardStore from "@/store/BoardStore";
import React, { useEffect } from "react";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleDragEnd = () => {

  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={"board"} direction="horizontal" type="column">
        {(provided) => (
          <div className="grid grid-cols-3 mx-auto gap-5 p-10 max-w-7xl mx-auto drop-shadow-lg"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >

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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
