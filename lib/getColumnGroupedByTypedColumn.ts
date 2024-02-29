import { databases } from "@/appWrite";

const getColumnsGroupedByTypedColumn: () => Promise<Board> = async () => {
  const docs = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DB_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ID!
  );
  const todos = docs.documents;
  console.log(todos);

  //Create Board, Map<TypedColumn, Column>
  const columns = todos.reduce((acc, todo) => {
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

  //If todos is empty.
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
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
