export const getTodoOrder = () => {
    return JSON.parse(sessionStorage.getItem("todoOrder")!)
}

export const getInProgressOrder = () =>{
    return JSON.parse(sessionStorage.getItem("inprogressOrder")!)
}

export const getDoneOrder = () => {
    return JSON.parse(sessionStorage.getItem("doneOrder")!);
}
