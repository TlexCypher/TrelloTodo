import React from "react";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import useBoardStore from "@/store/BoardStore";
import { Draggable, Droppable } from "react-beautiful-dnd";

type Props = {
  id: string;
  todos: Todo[];
  index: number;
};

const Column = ({ id, todos, index }: Props) => {
  const searchString = useBoardStore((state) => state.searchString);

  const translateId = (id: string) => {
    if (id === "todo") return "To Do"
    else if (id === "inprogress") return "In Progress"
    return "Done"
  }

  return (
    <Draggable draggableId={id} index={index} >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={index.toString()} type={"card"}>
            {(provided, snapshot) => (
              <div
                className={`${snapshot.isDraggingOver ? "bg-green-200/90 rounded-xl text-center" : "bg-white/50 rounded-xl text-center"}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <p className="font-bold text-xl p-3">
                  {translateId(id)}
                </p>
                {searchString
                  ? todos.map((todo: Todo, index) => {
                    if (todo.content.includes(searchString)) {
                      return (
                        <Draggable
                          key={todo.$id}
                          draggableId={todo.$id}
                          index={index}
                        >
                          {(provided) => (
                            <TodoCard
                              todo={todo}
                              index={index}
                              id={id as TypedColumn}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      );
                    }
                  })
                  : todos.map((todo: Todo, index) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id as TypedColumn}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                <div className="flex justify-end mt-3">
                  <PlusCircleIcon
                    className="rounded-full h-10 w-10 text-green-500 transition-transform duration-300 
                    hover:-translate-y-1 hover:translate-x-1 hover:text-green-300/80"
                  />
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable >
  );
};

export default Column;
