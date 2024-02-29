interface Board {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Column {
  id: string;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  type: TypedColumn;
  content: string;
  image?: string;
}
