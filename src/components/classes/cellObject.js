import {
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
}
