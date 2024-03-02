const setGroupOrder = (groupOrder: TypedColumn[]) => {
  sessionStorage.removeItem("groupOrder");
  sessionStorage.setItem("groupOrder", JSON.stringify(groupOrder));
}

export default setGroupOrder;
