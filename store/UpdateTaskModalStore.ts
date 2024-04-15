import {create} from "zustand";

interface UpdateTaskModalState {
    isOpen: boolean,
    originalType: TypedColumn,
    newType: TypedColumn,
    taskId: string,
    taskContent: string,
    openModal: () => void;
    closeModal: () => void;
    setOriginalType: (originalType: TypedColumn) => void
    setNewType: (originalType: TypedColumn) => void;
    setTaskId: (taskId: string) => void;
    setTaskContent: (taskContent: string) => void;
}

const useUpdateTaskModalStore = create<UpdateTaskModalState>((set) => ({
    isOpen: false,
    originalType: "todo",
    newType: "todo",
    taskId: "",
    taskContent: "",
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
    },
    setTaskContent: (taskContent: string) => {
        set({ taskContent: taskContent })
    }
}))


export default useUpdateTaskModalStore;