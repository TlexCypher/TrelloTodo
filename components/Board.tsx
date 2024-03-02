"use client";

import useBoardStore from "@/store/BoardStore";
import React, { useEffect } from "react";
import Column from "./Column";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const [board, getBoard, setBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    /*If we don't have destination, nothing to do we have.*/
    if (!destination) return;
    const souceColumnId = source.droppableId;
    const destinationColumnId = destination?.droppableId;
    const indexInSouceColumn = source.index;
    const indexInDestinationColumn = destination.index;
    /*Exactly same position, nothing to do we have.*/
    if (souceColumnId === destinationColumnId && indexInSouceColumn === indexInDestinationColumn) return;
    /* Column dnd.*/
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(indexInSouceColumn, 1);
      entries.splice(indexInDestinationColumn, 0, removed);
      const rearragedColumns = new Map(entries);
      setBoard({
        ...board,
        columns: rearragedColumns,
      })
    } else {
    }
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
