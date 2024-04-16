import {create} from "zustand";

interface UpdateTaskModalState {
    isOpen: boolean,
    originalType: TypedColumn,
    newType: TypedColumn,
    taskId: string,
    taskContent: string,
    todo: Todo,
    openModal: () => void;
    closeModal: () => void;
    setOriginalType: (originalType: TypedColumn) => void
    setNewType: (originalType: TypedColumn) => void;
    setTaskId: (taskId: string) => void;
    setTaskContent: (taskContent: string) => void;
    setTodo: (todo: Todo) => void;
}

const useUpdateTaskModalStore = create<UpdateTaskModalState>((set) => ({
    isOpen: false,
    originalType: "todo",
    newType: "todo",
    taskId: "",
    taskContent: "",
    todo: {
        $id: "",
        $createdAt: "",
        type: "todo",
        content: "",
        image: "",
    },
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
    },
    setTodo: (todo: Todo) => {
        set({ todo: todo })
    }
}))


export default useUpdateTaskModalStore;