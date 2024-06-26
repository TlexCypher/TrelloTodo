import { ID, databases } from "@/appWrite";
import Board from "@/components/Board";
import getColumnsGroupedByTypedColumn from "@/lib/getColumnGroupedByTypedColumn";
import { create } from "zustand";
import getTodosOrderMap from "@/lib/getTodosOrderMap";
import setTodosOrder from "@/lib/setTodosOrder";
import {from} from "stylis";
import board from "@/components/Board";

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
  addTask: (taskType: TypedColumn, taskContent: string) => void;
  updateTask: (todo: Todo, taskOriginalType: TypedColumn, newTaskType: TypedColumn) => void;
}

const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  searchString: "",
  newTaskInput: "",
  setBoard: (board: Board) => {
    console.log("setBoard>>", board.columns)
    set({ board })
  },
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
      const newTodosOrderMap = getTodosOrderMap(newColumns)
      console.log("delete>>", newTodosOrderMap)
      setTodosOrder(newTodosOrderMap);
    }
    deleteTaskFunc();
  },
  addTask: (taskType: TypedColumn, taskContent: string) => {
    const addTaskFunc = async () => {
      const resp = await databases.createDocument(
        process.env.NEXT_PUBLIC_DB_ID!,
        process.env.NEXT_PUBLIC_COLLECTION_ID!,
        ID.unique(),
        {
          type: taskType,
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

      const newTodosOrderMap = getTodosOrderMap(newColumns)
      setTodosOrder(newTodosOrderMap);
    };
    addTaskFunc();
  },

  updateTask: (todo: Todo, taskOriginalType: TypedColumn, newTaskType: TypedColumn) => {
    const updateTaskFunc = async () => {
      databases.updateDocument(
          process.env.NEXT_PUBLIC_DB_ID!,
          process.env.NEXT_PUBLIC_COLLECTION_ID!,
          todo.$id,
          {
            type: newTaskType,
            content: get().newTaskInput,
          }
      )
      const newColumns = new Map(get().board.columns);
      const fromCol = newColumns.get(taskOriginalType)!;
      const toCol = newColumns.get(newTaskType)!;
      const deleteIndex = fromCol.todos.indexOf(todo, 0);

      fromCol.todos.splice(deleteIndex, 1)
      console.log("fromCol>>", fromCol);
      todo.content = get().newTaskInput
      todo.type = newTaskType
      toCol.todos.push(todo)
      console.log("toCol>>", toCol);

      newColumns.set(taskOriginalType, fromCol);
      newColumns.set(newTaskType, toCol);

      setTodosOrder(getTodosOrderMap(newColumns));

      set({ board: {
        columns: newColumns,
      }})
    };
    updateTaskFunc()
  }
}));

export default useBoardStore;
