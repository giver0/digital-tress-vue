export const useDebag = () => {
  function isAnyCellAtBottom(tree, fieldCellsHeight, trees) {
    let isAtBottom = false
    tree.cells.forEach(cell => {
      if (cell.j === fieldCellsHeight - 1 || cell.isCellFalling === true) {
        isAtBottom = true
      }
      if (!isAtBottom) {
        console.log('trees :>> ', trees);
        console.log('tree :>> ', tree);
        throw new Error("no cell on bottom");
      }
    })
  }

  function isCellsParentRight(tree, fieldCellsHeight, trees) {
    tree.cells.forEach(cell => {
      if (cell.parentTree.id !== tree.id) {
        console.log('trees :>> ', trees);
        console.log('tree :>> ', tree);
        console.log('tree.id :>> ', tree.id);
        console.log('cell.parentTree.id :>> ', cell.parentTree.id);
        throw new Error("cell.parentTree !== tree.id");
      }
    })
  }

  return {
    isAnyCellAtBottom,
    isCellsParentRight,
  }
}

export default useDebag
