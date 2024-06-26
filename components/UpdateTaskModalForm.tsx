import {RadioGroup} from "@headlessui/react";
import React, {ChangeEvent} from "react";
import useBoardStore from "@/store/BoardStore";
import useUpdateTaskModalStore from "@/store/UpdateTaskModalStore";

const UpdateTaskModalForm = () => {
    const [newTaskInput, setNewTaskInput, updateTask] = useBoardStore((state) => [state.newTaskInput, state.setNewTaskInput, state.updateTask])
    const [todo, originalType, taskContent, newType, setNewType, closeModal] = useUpdateTaskModalStore((state) => [state.todo, state.originalType, state.taskContent, state.newType, state.setNewType, state.closeModal])
    const handleNewTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskInput(e.target.value)
    }
    const handleSubmitUpdateTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        updateTask(todo, originalType, newType)
        e.preventDefault()
        closeModal();
    }

    return (
        <div
            className='max-w-md mx-auto w-full bg-white px-20 py-10 text-center rounded-xl'
        >
            <p className='mb-5 font-bold text-2xl text-pink-600/80'>Update Task Form</p>
            <input
                placeholder={"Enter task title"}
                className='flex justify-center items-center w-full outline-none h-16 border rounded-lg px-3 mb-5'
                type={"text"}
                // value={taskContent}
                onChange={handleNewTaskInput}
            />
            <p className='mb-3 font-bold drop-shadow-sm'>Select task type</p>
            <RadioGroup value={newType} onChange={setNewType}>
                <RadioGroup.Option value="todo" className={"mb-5"}>
                    {({ active }) => (
                        <div className={active ? 'bg-red-400/40 py-6 rounded-lg text-white text-lg mx-auto' :
                            'bg-red-400 py-6 rounded-lg text-white text-lg mx-auto'}
                        >
                            To do
                        </div>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option value="inprogress" className={"mb-5"}>
                    {({ active }) => (
                        <div className={active ? 'bg-yellow-400/40 py-6 rounded-lg text-white text-lg mx-auto'
                            : 'bg-yellow-400 py-6 rounded-lg text-white text-lg mx-auto'}
                        >
                            In Progress
                        </div>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option value="done" className={"mb-5"}>
                    {({ active }) => (
                        <div className={active ? 'bg-green-400/40 py-6 rounded-lg text-white text-lg mx-auto'
                            : 'bg-green-400 py-6 rounded-lg text-white text-lg mx-auto'}
                        >
                            Done
                        </div>
                    )}
                </RadioGroup.Option>
            </RadioGroup>
            <button type="submit" className='bg-pink-300/60 text-pink-600/80 italic font-bold p-2 rounded-lg
      hover:ring ring-pink-300 hover:ring-pink-500 transition duration-300'
                    onClick={e => handleSubmitUpdateTask(e)}
            >
                Let's Go!
            </button>
        </div >
    )
}

export default UpdateTaskModalForm
