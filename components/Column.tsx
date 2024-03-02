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

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={id} type={"card"}>
            {(provided, snapshot) => (
              <div
                className="bg-white/50 text-center rounded-xl"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <p className="font-bold text-xl p-3">{id}</p>
                {searchString
                  ? todos.map((todo: Todo) => {
                    if (todo.content.includes(searchString)) {
                      return (
                        <Draggable draggableId={todo.$id} index={index}>
                          {(provided) => (
                            <TodoCard
                              key={todo.$id}
                              todo={todo}
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
                    <Draggable draggableId={todo.$id} index={index}>
                      {(provided) => (
                        <TodoCard
                          key={todo.$id}
                          todo={todo}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                <div className="flex justify-end mt-3">
                  <PlusCircleIcon className="rounded-full h-10 w-10 text-green-500" />
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
