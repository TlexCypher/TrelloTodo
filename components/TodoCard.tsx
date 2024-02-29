import { XMarkIcon } from "@heroicons/react/16/solid";
import React from "react";

type Props = {
  content: string;
  image: string | undefined;
};

const TodoCard = ({ content, image }: Props) => {
  return (
    <div className="bg-white py-5 px-8 m-1 rounded-xl drop-shadow-2xl">
      <div className="flex items-center justify-between">
        <p>{content}</p>
        <XMarkIcon className="h-8 w-8 text-white bg-red-500 rounded-full" />
      </div>
      {/* TODO: Change to <Image/> */}
      {image && <p>{image}</p>}
    </div>
  );
};

export default TodoCard;
