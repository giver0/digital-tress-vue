export default class cellObject {
  constructor(i, j, blockClass, basicColor) {
    this.i = i
    this.j = j
    this.id = `i${i}j${j}`
    this.indexInTree = null
    this.type = 'field'
    this.color = basicColor
    this.nextCell = null
    this.previousCell = null
    this.parentTree = null
    this.elementById = null
    this.isCreateAnimation = true
    this.isCellAnimation = false
  }

  setColor(color) {
    this.color = color
  }

  setCellType() {
    this.type = 'cell'
    this.isCreateAnimation = false
    this.isCellAnimation = true
  }

  setFieldType(basicColor) {
    this.isCreateAnimation = false
    this.isCreateAnimation = true
    this.isCellAnimation = false
    this.type = 'field'
    this.color = basicColor
    this.indexInTree = null
  }
}
