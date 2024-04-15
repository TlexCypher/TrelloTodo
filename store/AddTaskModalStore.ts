import { create } from "zustand";

interface AddTaskModalState {
  isOpen: boolean,
  taskType: TypedColumn,
  openModal: () => void;
  closeModal: () => void;
  setTaskType: (taskType: TypedColumn) => void;
}

const useAddTaskModalStore = create<AddTaskModalState>((set) => ({
  isOpen: false,
  taskType: "todo",
  openModal: () => {
    set({ isOpen: true })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
  setTaskType: (taskType: TypedColumn) => {
    set({ taskType });
  }
}));

export default useAddTaskModalStore;

