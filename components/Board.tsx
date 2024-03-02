"use client";

import useBoardStore from "@/store/BoardStore";
import React, { useEffect } from "react";
import Column from "./Column";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    console.log("source>>", source);
    console.log("destination>>", destination);
    console.log("type>>", type);
  }


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={"board"} direction="horizontal" type="column">
        {(provided) => (
          <div className="grid grid-cols-3 mx-auto gap-5 p-10 max-w-7xl"
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
