import getColumnsGroupedByTypedColumn from "@/lib/getColumnGroupedByTypedColumn";
import { create } from "zustand";

interface BoardState {
  board: Board;
  searchString: string;
  setBoard: (board: Board) => void;
  setSearchString: (searchString: string) => void;
  getBoard: () => void;
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
}));

export default useBoardStore;
