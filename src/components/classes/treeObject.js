import {
  BASIC_COLOR,
} from '@/constant/basic'
import useGeneral from '@/use/use-general'
import useGenome from '@/use/use-genome'

const {
  generateID,
  generateRandomColor,
  getRandomInt,
} = useGeneral()
const {
  generateGenome,
} = useGenome()

export default class treeObject {
  constructor(
    digitalTrees,
    fieldCells,
    logTextArray,
    genome = generateGenome(),
    headColor = generateRandomColor(),
    bodyColor = generateRandomColor(),
  ) {
    this.digitalTrees = digitalTrees
    this.fieldCells = fieldCells
    this.logTextArray = logTextArray
    this.id = generateID()
    this.cells = []
    this.counterCell = 0
    this.counterCellAll = 0
    this.lastCell = null
    this.isFreeCellsAround = true
    this.headColor = headColor
    this.bodyColor = bodyColor
    this.positionCurrent = null
    this.positionNext = null
    this.energy = 10
    this.genome = genome
    this.lastIncreaseEnergy = 0
    this.lastReduceEnergy = 0
    digitalTrees.push(this)
  }

  // don't used
  chooseRandomStartCell() {
    let whileCounter = 0
    let j
    let i
    while (whileCounter < this.fieldCells.length * this.fieldCells[0].length) {
      j = getRandomInt(0, this.fieldCells.length)
      i = getRandomInt(0, this.fieldCells[0].length)
      // logSomeText("In chooseRandomStartCell()")
      console.log('In chooseRandomStartCell()')

      if (this.fieldCells[j][i].color === BASIC_COLOR) {
        return this.fieldCells[j][i]
      }
      whileCounter += 1
   }
  }

  // don't used
  FreeCellsAround(cell) {
    // console.log('in free cell');
    // console.log(cell.i, ' ', cell.j);
    const freeFields = []
    let i = cell.i - 1
    let j = cell.j - 1
    const iEnd = cell.i + 2
    const jEnd = cell.j + 2

    for (; j < jEnd; j++) {
      for (i = cell.i - 1; i < iEnd; i++) {
        if (this.isCoordinateInField(i, j)) {
          if (this.fieldCells[j][i].color === BASIC_COLOR) {
            freeFields.push([j, i])
          }
        }
      }
    }
    return freeFields
  }

  // don't used
  isCoordinateInField(i, j) {
    return i >= 0 && i < this.fieldCells[0].length && j >= 0 && j < this.fieldCells.length
  }
}
