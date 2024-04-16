
const setTodosOrder = (todosOrder: Map<TypedColumn, Todo[]>) => {
    sessionStorage.removeItem("todoOrder");
    sessionStorage.removeItem("inprogressOrder");
    sessionStorage.removeItem("doneOrder");

    sessionStorage.setItem("todoOrder", JSON.stringify(todosOrder.get("todo")))
    sessionStorage.setItem("inprogressOrder", JSON.stringify(todosOrder.get("inprogress")))
    sessionStorage.setItem("doneOrder", JSON.stringify(todosOrder.get("done")))
}

export default setTodosOrder;