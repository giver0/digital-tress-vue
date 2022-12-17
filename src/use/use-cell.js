export const useCell = () => {
  function createCellLog(tree) {
    // let logText = "Create cell column:" + tree.lastCell.i + ", raw:" + tree.lastCell.j +", TreeID: "+tree.id
    const logObject = {
      i: tree.lastCell.i,
      j: tree.lastCell.j,
      id: tree.id,
      type: 'create',
      headColor: tree.headColor,
      bodyColor: tree.bodyColor,
    }
    tree.logTextArray.push(logObject)
    if (tree.logTextArray.length > 50) {
      tree.logTextArray.shift()
    }
  }

  return {
    createCellLog,
  }
}

export default useCell
