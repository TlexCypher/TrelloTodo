const getTodosOrderMap = (columns: Map<TypedColumn, Column>): Map<TypedColumn, Todo[]> => {
    const newTodosOrderMap = new Map<TypedColumn, Todo[]>();
    const todos = columns.get("todo")?.todos!;
    const inprogresses = columns.get("inprogress")?.todos!;
    const dones = columns.get("done")?.todos!;

    newTodosOrderMap.set("todo", todos);
    newTodosOrderMap.set("inprogress", inprogresses);
    newTodosOrderMap.set("done", dones);

    return newTodosOrderMap;
}

export default getTodosOrderMap;