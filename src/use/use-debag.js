import cellObject from '@/components/classes/cellObject'
import treeObject from '@/components/classes/treeObject'

export const useDebag = () => {
  const isThrowError = true

  function throwError(errorMessage, trees, tree) {
    console.log('trees :>> ', trees);
    console.log('tree :>> ', tree);
    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  function isAnyCellAtBottom(tree, fieldCellsHeight, trees) {
    if (isThrowError) {
      let isAtBottom = false
      tree.cells.forEach(cell => {
        if (cell.j === fieldCellsHeight - 1 || cell.isCellFalling === true) {
          isAtBottom = true
        }
        if (!isAtBottom) {
          throwError('no cell on bottom', trees, tree)
        }
      })
    }
  }

  function isCellsParentRight(tree, trees) {
    if (isThrowError) {
      tree.cells.forEach(cell => {
        if (cell.parentTree.id !== tree.id) {
          console.log('tree.id :>> ', tree.id);
          console.log('cell.parentTree.id :>> ', cell.parentTree.id);
          throwError('cell.parentTree !== tree.id', trees, tree)
        }
      })
    }
  }

  function isInstanceOfCells(tree, trees) {
    if (isThrowError) {
      tree.cells.forEach(cell => {
        const isInstance = cell instanceof cellObject
        if (!isInstance) {
          console.log('isInstance :>> ', isInstance);
          throw new Error("Cell have wrong class", trees, tree);
        }
      })
    }
  }

  function isCellHaveIndexOfTree(tree, trees) {
    if (isThrowError) {
      tree.cells.forEach(cell => {
        const isHaveIndex = cell.indexInTree
        if (cell.indexInTree === null) {
          throwError('cell.parentTree !== tree.id', trees, tree)
        }
      })
    }
  }

  function isInstanceOfTree(tree, trees) {
    if (isThrowError) {
      const isInstance = tree instanceof treeObject
      if (!isInstance) {
        console.log('isInstance :>> ', isInstance);
        throw new Error("Tree have wrong class", trees, tree);
      }
    }
  }

  function isColorCorrect(tree, trees) {
    if (isThrowError) {
      if (tree.headColor.length !== 7 || tree.bodyColor.length !== 7) {
        console.log('tree.headColor :>> ', tree.headColor);
        console.log('tree.bodyColor :>> ', tree.bodyColor);
        throw new Error("color should have 6 symbol", trees, tree);
      }
      tree.cells.forEach(cell => {
        if (cell.color.length !== 7) {
          console.log('cell.color :>> ', cell.color);
          throw new Error("color should have 6 symbol", trees, tree);
        }
      })
    }
  }

  return {
    isAnyCellAtBottom,
    isCellsParentRight,
    isInstanceOfCells,
    isInstanceOfTree,
    isColorCorrect,
    isCellHaveIndexOfTree,
  }
}

export default useDebag
