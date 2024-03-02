import { create } from "zustand";

interface ModalState {
  isOpen: boolean,
  setOpen: (isOpen: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
}));

export default useModalStore;

