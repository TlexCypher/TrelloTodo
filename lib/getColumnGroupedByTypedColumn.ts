import { databases } from "@/appWrite";
import setGroupOrder from "./setGroupOrder";
import getGroupOrder from "./getGroupOrder";
import {getDoneOrder, getInProgressOrder, getTodoOrder} from "@/lib/getTodosOrder";
import Column from "@/components/Column";

const getColumnsGroupedByTypedColumn: () => Promise<Board> = async () => {
  const docs = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DB_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ID!
  );
  const todos = docs.documents;

  //Create Board, Map<TypedColumn, Column>
  const columns = new Map<TypedColumn, Column>();

  columns.set("todo", {
    id: "todo",
    todos: getTodoOrder(),
  })

  columns.set("inprogress", {
    id: "inprogress",
    todos: getInProgressOrder(),
  })

  columns.set("done", {
    id: "done",
    todos: getDoneOrder(),
  })

  //If todos is empty.
  let columnTypes: TypedColumn[] = getGroupOrder();
  if (!columnTypes) {
    columnTypes = ["todo", "inprogress", "done"];
    setGroupOrder(columnTypes);
  }
  //Sort by key, typed-column
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  return {
    columns: sortedColumns,
  };
};

export default getColumnsGroupedByTypedColumn;
