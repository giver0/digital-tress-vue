import { BASIC_COLOR } from "@/constant/basic"

export default class cellObject {
  constructor(i, j, blockClass) {
    this.i = i
    this.j = j
    this.id = `i${i}j${j}`
    this.indexInTree = null
    this.type = 'field'
    this.color = BASIC_COLOR
    this.genome = null
    this.nextCell = null
    this.parentTree = null
    this.isCreateAnimation = true
    this.isCellAnimation = false
    this.isCellFalling = false
  }

  setColor(color) {
    this.color = color
  }

  setCellType() {
    this.type = 'cell'
    this.isCreateAnimation = false
    this.isCellAnimation = true
  }

  setFieldType() {
    this.isCreateAnimation = false
    this.isCreateAnimation = true
    this.isCellAnimation = false
    this.type = 'field'
    this.color = BASIC_COLOR
    this.indexInTree = null
    this.isCellFalling = false
  }

  generatedEnergyByCell(fieldCells) {
    return fieldCells.length - 1 - this.j
  }
}
