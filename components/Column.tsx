import React from "react";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import useBoardStore from "@/store/BoardStore";
import { Draggable } from "react-beautiful-dnd";

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
          <div className="bg-white/50 text-center rounded-xl">
            <p className="font-bold text-xl p-3">{id}</p>
            {searchString
              ? todos.map((todo: Todo) => {
                if (todo.content.includes(searchString)) {
                  return (
                    <TodoCard
                      key={todo.$id}
                      content={todo.content}
                      image={todo.image}
                    />
                  );
                }
              })
              : todos.map((todo: Todo) => (
                <TodoCard
                  key={todo.$id}
                  content={todo.content}
                  image={todo.image}
                />
              ))}
            <div className="flex justify-end mt-3">
              <PlusCircleIcon className="rounded-full h-10 w-10 text-green-500" />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
