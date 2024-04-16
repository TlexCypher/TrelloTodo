"use client";

import useBoardStore from "@/store/BoardStore";
import React, { useEffect } from "react";
import Column from "./Column";
import { DragDropContext, DragStart, DropResult, Droppable } from "react-beautiful-dnd";
import setGroupOrder from "@/lib/setGroupOrder";
import setTodosOrder from "@/lib/setTodosOrder";
import getTodosOrderMap from "@/lib/getTodosOrderMap";

const Board = () => {
  const [board, getBoard, setBoard, updateDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
    state.updateDB,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    /*If we don't have destination, nothing to do we have.*/
    if (!destination) return;
    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination?.droppableId;
    const indexInSourceColumn = source.index; const indexInDestinationColumn = destination.index;
    /*Exactly same position, nothing to do we have.*/
    if (sourceColumnId === destinationColumnId && indexInSourceColumn === indexInDestinationColumn) return;
    /* Column dnd.*/
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      //columns could be overwritten by this expression.
      setBoard({
        ...board,
        columns: rearrangedColumns,
      });
      setGroupOrder(Array.from(rearrangedColumns.keys()) as TypedColumn[]);
    } else {
      //Handle task drag

      console.log("source>>", source);
      console.log("destination>>", destination)

      const columns = Array.from(board.columns);
      const startColumn = columns[Number(source.droppableId)];
      const finishColumn = columns[Number(destination.droppableId)];

      console.log("startColumn >> ", startColumn)
      console.log("finishColumn >> ", finishColumn)

      const startCol = {
        id: startColumn[0],
        todos: startColumn[1].todos,
      };

      const finishCol = {
        id: finishColumn[0],
        todos: finishColumn[1].todos,
      };

      if (!startCol || !finishCol) return;
      if (source.index === destination.index && startCol === finishCol) return;
      const newTodos = startCol.todos;
      const [todoMoved] = newTodos.splice(source.index, 1);
      console.log("Moved todo >> ", todoMoved)
      if (startCol.id === finishCol.id) {
        //Same Column
        newTodos.splice(destination.index, 0, todoMoved);
        console.log("new todos >> ", newTodos)
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);
        setBoard({ ...board, columns: newColumns });
        const newTodosOrderMap = getTodosOrderMap(newColumns)
        setTodosOrder(newTodosOrderMap);
      } else {
        const newFinTodos = finishCol.todos;
        newFinTodos.splice(destination.index, 0, todoMoved);
        const newStartCol = {
          id: startCol.id,
          todos: newTodos,
        };
        const newFinishCol = {
          id: finishCol.id,
          todos: newFinTodos,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newStartCol);
        newColumns.set(finishCol.id, newFinishCol);
        setBoard({ ...board, columns: newColumns });
        const newTodosOrderMap = getTodosOrderMap(newColumns)
        setTodosOrder(newTodosOrderMap);
        updateDB(todoMoved, finishCol.id as TypedColumn)
      }
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
                  id={typedColumn as TypedColumn}
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
