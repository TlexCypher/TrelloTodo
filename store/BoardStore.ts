import { ID, databases } from "@/appWrite";
import Board from "@/components/Board";
import getColumnsGroupedByTypedColumn from "@/lib/getColumnGroupedByTypedColumn";
import { create } from "zustand";

interface BoardState {
  board: Board;
  searchString: string;
  newTaskInput: string,
  setBoard: (board: Board) => void;
  setSearchString: (searchString: string) => void;
  setNewTaskInput: (newTaskInput: string) => void;
  getBoard: () => void;
  updateDB: (todo: Todo, type: TypedColumn) => void;
  deleteTask: (todoId: string, typedColumn: TypedColumn, taskIndex: number) => void;
  addTask: (taskType: string, taskContent: string) => void;
}

const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  searchString: "",
  newTaskInput: "",
  setBoard: (board: Board) => set({ board }),
  getBoard: async () => {
    const board = await getColumnsGroupedByTypedColumn();
    set({ board });
  },
  setSearchString: (searchString: string) => {
    set({ searchString });
  },
  setNewTaskInput: (newTaskInput: string) => {
    set({ newTaskInput });
  },
  updateDB: (todo: Todo, type: TypedColumn) => {
    databases.updateDocument(
      process.env.NEXT_PUBLIC_DB_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      todo.$id,
      {
        type: type,
        content: todo.content
      }
    )
  },
  deleteTask: (todoId: string, typedColumn: TypedColumn, taskIndex: number) => {
    const deleteTaskFunc = async () => {
      const newColumns = new Map(get().board.columns);
      newColumns.get(typedColumn)?.todos.splice(taskIndex, 1);
      set({
        board: {
          columns: newColumns
        }
      })
      await databases.deleteDocument(process.env.NEXT_PUBLIC_DB_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!, todoId);
    }
    deleteTaskFunc();
  },
  addTask: (taskType: string, taskContent: string) => {
    const addTaskFunc = async () => {
      let convertedTaskType: TypedColumn = "todo";
      if (taskType === "In Progress") convertedTaskType = "inprogress";
      else if (taskType === "Done") convertedTaskType = "done";

      const resp = await databases.createDocument(
        process.env.NEXT_PUBLIC_DB_ID!,
        process.env.NEXT_PUBLIC_COLLECTION_ID!,
        ID.unique(),
        {
          type: convertedTaskType,
          content: taskContent,
        }
      )
      set({ newTaskInput: "" })

      /* Make new Board and set({board: newBoard}) */
      const newColumns = new Map(get().board.columns);
      newColumns.get(resp.type)?.todos.push({
        $id: resp.$id,
        $createdAt: resp.$collectionId,
        type: resp.type,
        content: resp.content,
      })

      set({
        board: {
          columns: newColumns
        }
      })
    };
    addTaskFunc();
  },
}));

export default useBoardStore;
