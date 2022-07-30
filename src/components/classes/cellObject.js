import {
  TYPE_CELL,
  TYPE_FIELD,
  BASIC_COLOR,
} from '@/constant/basic'

export default class cellObject {
  constructor(i, j, fieldCells) {
    this.i = i
    this.j = j
    this.id = `i${i}j${j}`
    this.indexInTree = null
    this.type = TYPE_FIELD
    this.color = BASIC_COLOR
    this.genome = 0
    this.nextCell = null
    this.parentTree = null
    this.isCreateAnimation = true
    this.isCellAnimation = false
    this.isCellFalling = false
    this.fieldCells = fieldCells
  }

  setColor(color) {
    this.color = color
  }

  setCellType() {
    this.type = TYPE_CELL
    this.isCreateAnimation = false
    this.isCellAnimation = true
  }

  setFieldType() {
    this.isCreateAnimation = false
    this.isCreateAnimation = true
    this.isCellAnimation = false
    this.type = TYPE_FIELD
    this.color = BASIC_COLOR
    this.indexInTree = null
    this.isCellFalling = false
    this.parentTree = null
    this.genome = 0
    this.nextCell = null
  }

  generatedEnergyByCell() {
    const countCellAbove = 2

    if (this.isCellFalling) {
      return 0
    } else {
      const isCellAtUpperPoint = this.j === 0
      if (isCellAtUpperPoint) {
        return 3
      }
      const isCellAtLowerPoint = this.j === this.fieldCells.length - 1
      if (isCellAtLowerPoint) {
        return 0
      }
      let cellGeneratedEnergy = 0
      for (let index = 1; index < countCellAbove + 1; index++) {
        const jForCheck = this.j - index
        const isCellExist = jForCheck in this.fieldCells && this.i in this.fieldCells[jForCheck]
        if (isCellExist) {
          const isUpperCellField = this.fieldCells[jForCheck][this.i]?.type === TYPE_FIELD
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

  cellFalling() {
    this.isCellFalling = true
  }

  cellIsNotFalling() {
    this.isCellFalling = false
  }
}
