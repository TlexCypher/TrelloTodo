import { create } from "zustand";

interface ModalState {
  isOpen: boolean,
  taskType: TypedColumn,
  openModal: () => void;
  closeModal: () => void;
  setTaskType: (taskType: TypedColumn) => void;
}

const useModalStore = create<ModalState>((set) => ({
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

export default useModalStore;

