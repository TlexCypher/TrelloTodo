const getGroupOrder = () => {
  return JSON.parse(sessionStorage.getItem("groupOrder")!);
}

export default getGroupOrder;
