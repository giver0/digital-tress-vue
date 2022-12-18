import {
  TYPE_CELL,
  TYPE_FIELD,
  BASIC_COLOR,
} from '@/constant/basic'

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

  function setCellColor(color, cell) {
    cell.color = color
  }

  function setCellType(cell) {
    cell.type = TYPE_CELL
    cell.isCreateAnimation = false
    cell.isCellAnimation = true
  }

  function setCellFieldType(cell) {
    cell.isCreateAnimation = false
    cell.isCreateAnimation = true
    cell.isCellAnimation = false
    cell.type = TYPE_FIELD
    cell.color = BASIC_COLOR
    cell.indexInTree = null
    cell.isCellFalling = false
    cell.parentTree = null
    cell.genome = 0
    cell.nextCell = null
  }

  function setCellFalling(cell) {
    cell.isCellFalling = true
  }

  function setCellIsNotFalling(cell) {
    cell.isCellFalling = false
  }

  function getGeneratedEnergyByCell(cell, fieldCells) {
    const countCellAbove = 2

    if (cell.isCellFalling) {
      return 0
    } else {
      const isCellAtUpperPoint = cell.j === 0
      if (isCellAtUpperPoint) {
        return 3
      }
      const isCellAtLowerPoint = cell.j === fieldCells.length - 1
      if (isCellAtLowerPoint) {
        return 0
      }
      let cellGeneratedEnergy = 0
      for (let index = 1; index < countCellAbove + 1; index++) {
        const jForCheck = cell.j - index
        const isCellExist = jForCheck in fieldCells && cell.i in fieldCells[jForCheck]
        if (isCellExist) {
          const isUpperCellField = fieldCells[jForCheck][cell.i]?.type === TYPE_FIELD
          if (isUpperCellField) {
            cellGeneratedEnergy = cellGeneratedEnergy + 1
          } else {
            index = countCellAbove + 1
            return cellGeneratedEnergy
          }
        } else {
          index = countCellAbove + 1
          return 3
        }
      }
      return cellGeneratedEnergy
    }
  }

  return {
    setCellColor,
    setCellType,
    setCellFieldType,
    createCellLog,
    setCellFalling,
    setCellIsNotFalling,
    getGeneratedEnergyByCell,
  }
}

export default useCell
