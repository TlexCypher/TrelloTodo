import { databases } from "@/appWrite";
import setGroupOrder from "./setGroupOrder";
import getGroupOrder from "./getGroupOrder";
import {getDoneOrder, getInProgressOrder, getTodoOrder} from "@/lib/getTodosOrder";
import Column from "@/components/Column";
import setTodosOrder from "@/lib/setTodosOrder";
import getTodosOrderMap from "@/lib/getTodosOrderMap";

const getColumnsGroupedByTypedColumn: () => Promise<Board> = async () => {
  const docs = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DB_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ID!
  );
  const todos = docs.documents;

  //Create Board, Map<TypedColumn, Column>
  let columns = new Map<TypedColumn, Column>();
  if (!getTodoOrder() || !getInProgressOrder() || !getDoneOrder()) {
    columns = todos.reduce((acc, todo) => {
      if (!acc.get(todo.type)) {
        acc.set(todo.type, {
          id: todo.type,
          todos: [],
        });
      }
      acc.get(todo.type)!.todos.push({
        $id: todo.$id,
        $createdAt: todo.$createdAt,
        content: todo.content,
        type: todo.type,
      });
      return acc;
    }, new Map<TypedColumn, Column>());
    setTodosOrder(getTodosOrderMap(columns))
  }

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
