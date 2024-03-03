import useBoardStore from '@/store/BoardStore';
import useModalStore from '@/store/ModalStore'
import { RadioGroup } from '@headlessui/react'
import React, { ChangeEvent } from 'react'

const ModalForm = () => {
  const [taskType, setTaskType, closeModal] = useModalStore((state) => [
    state.taskType,
    state.setTaskType,
    state.closeModal,
  ]);

  const [newTaskInput, setNewTaskInput, addTask] = useBoardStore((state) => [
    state.newTaskInput,
    state.setNewTaskInput,
    state.addTask,
  ])

  const handleNewTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskInput(e.target.value);
  }

  const handleSubmitAddTask = (e) => {
    addTask(taskType, newTaskInput);
    closeModal();
    e.preventDefault();
  }

  return (
    <div
      className='max-w-md mx-auto w-full bg-white px-20 py-10 text-center rounded-xl'
    >
      <p className='mb-5 font-bold text-2xl text-pink-600/80'>Add Task Form</p>
      <input
        placeholder={"Enter task title"}
        className='flex justify-center items-center w-full outline-none h-16 border rounded-lg px-3 mb-5'
        onChange={handleNewTaskInput}
      />
      <p className='mb-3 font-bold drop-shadow-sm'>Select task type</p>
      <RadioGroup value={taskType} onChange={setTaskType}>
        <RadioGroup.Option value="To Do" className={"mb-5"}>
          {({ active }) => (
            <div className={active ? 'bg-red-400/40 py-6 rounded-lg text-white text-lg mx-auto' :
              'bg-red-400 py-6 rounded-lg text-white text-lg mx-auto'}
            >
              To do
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="In Progress" className={"mb-5"}>
          {({ active }) => (
            <div className={active ? 'bg-yellow-400/40 py-6 rounded-lg text-white text-lg mx-auto'
              : 'bg-yellow-400 py-6 rounded-lg text-white text-lg mx-auto'}
            >
              In Progress
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="Done" className={"mb-5"}>
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
        onClick={e => handleSubmitAddTask(e)}
      >
        Let's Go!
      </button>
    </div >
  )
}

export default ModalForm
