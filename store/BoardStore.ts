import { databases } from "@/appWrite";
import getColumnsGroupedByTypedColumn from "@/lib/getColumnGroupedByTypedColumn";
import { create } from "zustand";

interface BoardState {
  board: Board;
  searchString: string;
  setBoard: (board: Board) => void;
  setSearchString: (searchString: string) => void;
  getBoard: () => void;
  updateDB: (todo: Todo, type: TypedColumn) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  searchString: "",
  setBoard: (board: Board) => set({ board }),
  getBoard: async () => {
    const board = await getColumnsGroupedByTypedColumn();
    set({ board });
  },
  setSearchString: (searchString: string) => {
    set({ searchString });
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
}));

export default useBoardStore;
