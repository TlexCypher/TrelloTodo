import useBoardStore from "@/store/BoardStore";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useEffect } from "react";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";
import useUpdateTaskModalStore from "@/store/UpdateTaskModalStore";

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

  const deleteTask = useBoardStore((state) => state.deleteTask)
  const [setOriginalType, setTaskId, openModal] = useUpdateTaskModalStore((state) => [state.setOriginalType, state.setTaskId, state.openModal])

  const handleDeleteTask = () => {
    deleteTask(todo.$id, id, index);
  }

  const handleUpdateTask = () => {
    setOriginalType(todo.type)
    setTaskId(todo.$id)
    openModal()
  }

  return (
    <div
      className="bg-white py-5 px-8 m-4 rounded-xl drop-shadow-2xl"
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
    >
      <div className="flex items-center justify-between">
        <p>{todo.content}</p>
        <div className="ml-5">
          <XMarkIcon
            className="h-8 w-8 text-white bg-red-500 rounded-full 
          hover:shadow-xl hover:bg-red-300/80 mb-2 
          transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1"
            onClick={handleDeleteTask}
          />
          <PencilSquareIcon
            className="h-8 w-8 text-white bg-cyan-500 rounded-full 
          hover:shadow-xl hover:bg-cyan-300/80 
          transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1"
            onClick={handleUpdateTask}
          />
        </div>
      </div>
      {todo.image && <p>{todo.image}</p>}
    </div>
  );
};

export default TodoCard;
