import {create} from "zustand";

interface UpdateTaskModalState {
    isOpen: boolean,
    originalType: TypedColumn,
    newType: TypedColumn,
    taskId: string,
    openModal: () => void;
    closeModal: () => void;
    setOriginalType: (originalType: TypedColumn) => void
    setNewType: (originalType: TypedColumn) => void;
    setTaskId: (taskId: string) => void;
}

const useUpdateTaskModalStore = create<UpdateTaskModalState>((set) => ({
    isOpen: false,
    originalType: "todo",
    newType: "todo",
    taskId: "",
    openModal: () => {
        set({ isOpen: true })
    },
    closeModal: () => {
        set({ isOpen: false })
    },
    setOriginalType: (originalType: TypedColumn)  => {
        set({originalType: originalType})
    },
    setNewType: (newType: TypedColumn) => {
        set({newType: newType })
    },
    setTaskId: (taskId: string) => {
        set({ taskId: taskId })
    }
}))


export default useUpdateTaskModalStore;