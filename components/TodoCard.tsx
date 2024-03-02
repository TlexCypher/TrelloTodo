import { XMarkIcon } from "@heroicons/react/16/solid";
import React from "react";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

type Props = {
  todo: Todo
  index: number,
  id: TypedColumn,
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps
}: Props) => {
  return (
    <div
      className="bg-white py-5 px-8 m-2 rounded-xl drop-shadow-2xl"
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
    >
      <div className="flex items-center justify-between">
        <p>{todo.content}</p>
        <XMarkIcon className="h-8 w-8 text-white bg-red-500 rounded-full" />
      </div>
      {todo.image && <p>{todo.image}</p>}
    </div>
  );
};

export default TodoCard;
