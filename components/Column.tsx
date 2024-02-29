import React from "react";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

type Props = {
  id: string;
  todos: Todo[];
  index: number;
};

const Column = ({ id, todos, index }: Props) => {
  return (
    <div>
      <div className="bg-white/50 text-center rounded-xl">
        <p className="font-bold text-xl p-3">{id}</p>
        {todos.map((todo: Todo) => (
          <TodoCard key={todo.$id} content={todo.content} image={todo.image} />
        ))}
        <div className="flex justify-end mt-3">
          <PlusCircleIcon className="rounded-full h-10 w-10 text-green-500" />
        </div>
      </div>
    </div>
  );
};

export default Column;
