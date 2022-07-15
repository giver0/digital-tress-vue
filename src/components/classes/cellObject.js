import { BASIC_COLOR } from "@/constant/basic"

export default class cellObject {
  constructor(i, j, blockClass) {
    this.i = i
    this.j = j
    this.id = `i${i}j${j}`
    this.indexInTree = null
    this.type = 'field'
    this.color = BASIC_COLOR
    this.nextCell = null
    this.parentTree = null
    this.elementById = null
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

  moveDown(fieldCells) {
    console.log('i:', this.i, 'j:', this.j, 'Tree id:', this.parentTree);
    console.log('field move', fieldCells[this.j][this.i]);
    if (this.j === fieldCells.length - 1) {
      console.log('At bottom');
      this.isCellFalling = false
      this.parentTree.isFreeCellsAround = true
    } else {
      // const nextJ = this.j + 1
      console.log('need move');
      const bottomCell = fieldCells[this.j + 1][this.i]
      const isBottomCellField = bottomCell.type === 'field'
      if (isBottomCellField) {
        console.log('moveTo');
        console.log(this);
        for (const key in this) {
          bottomCell[key] = this[key];
        }
        bottomCell.j = bottomCell.j + 1
        bottomCell.id = `i${bottomCell.i}j${bottomCell.j}`
        this.parentTree.lastCell = bottomCell
        this.setFieldType()
      }
    }
  }

  moveCellTo(i, j) {

  }
}
