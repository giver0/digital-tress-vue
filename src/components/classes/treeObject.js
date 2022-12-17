import {
  TYPE_FIELD,
  BASIC_COLOR,
  GENOME_COUNT,
  GENOME_MAX_VALUE,
} from '@/constant/basic'
import useGeneral from '@/use/use-general'

const {
  generateID,
  generateRandomColor,
  getRandomInt,
} = useGeneral()

export default class treeObject {
  constructor(
    digitalTrees,
    fieldCells,
    logTextArray,
    genome = this.gererateGenome(),
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

  gererateGenome() {
    const genome = new Array(GENOME_COUNT).fill(0)
    .map(() => {
      return {
        // feature for future
        // upGen: {
        //   nextGen: getRandomInt(0, GENOME_MAX_VALUE),
        // },
        upGen: getRandomInt(0, GENOME_MAX_VALUE),
        downGen: getRandomInt(0, GENOME_MAX_VALUE),
        leftGen: getRandomInt(0, GENOME_MAX_VALUE),
        rightGen: getRandomInt(0, GENOME_MAX_VALUE),
      }
    })
    console.log('genome', genome)
    return genome
  }

  createCell() {
    const freeCellsArray = this.FreeCellsAround2(
      this.lastCell,
    )
    // console.log('freeCellsArray', freeCellsArray);

    if (freeCellsArray.length === 0) {
      this.isFreeCellsAround = false
      this.lastCell.isCellFalling = true
      if (this.counterCell > 1) {
        this.deleteTreeBody()
      }
    } else {
      const FreeCellCoordinate = this.chooseRandomPoint(freeCellsArray)
      const [j, i] = FreeCellCoordinate
      this.addNextCell(j, i)
    }
  }

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

  FreeCellsAround2(cell) {
    // console.log('in free cell');
    // console.log(cell.i, ' ', cell.j);
    const freeFields = []
    let i = cell.i - 1
    let j = cell.j - 1
    const iEnd = cell.i + 2
    const jEnd = cell.j + 2
    const fieldToCheck = []

    for (let index = j; index < jEnd; index++) {

    }

    for (; j < jEnd; j++) {
      for (i = cell.i - 1; i < iEnd; i++) {
        if (j in this.fieldCells && i in this.fieldCells[j]) {
          if (this.fieldCells[j][i].type === TYPE_FIELD) {
            freeFields.push([j, i])
          }
        }
      }
    }
    return freeFields
  }

  isCoordinateInField(i, j) {
    return i >= 0 && i < this.fieldCells[0].length && j >= 0 && j < this.fieldCells.length
  }

  chooseRandomPoint(freeCells) {
    const randomValue = getRandomInt(0, freeCells.length)
    return freeCells[randomValue]
  }
}
