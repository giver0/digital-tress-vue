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

  addFirstCell() {
    const firstCell = this.randomCellFloor()
    this.cells.push(firstCell)

    this.cells[0].setColor(this.headColor)
    this.cells[0].setCellType()
    this.cells[0].parentTree = this
    this.cells[0].indexInTree = this.cells.length - 1
    this.cells[0].genome = 0
    this.refreshLastCell()
    this.createCellLog()
  }

  chooseRandomStartCell() {
    let whileCounter = 0
    let j
    let i
    while (whileCounter < this.fieldCells.length * this.fieldCells[0].length) {
      j = this.getRandomInt(0, this.fieldCells.length)
      i = this.getRandomInt(0, this.fieldCells[0].length)
      // logSomeText("In chooseRandomStartCell()")
      console.log('In chooseRandomStartCell()')

      if (this.fieldCells[j][i].color === BASIC_COLOR) {
        return this.fieldCells[j][i]
      }
      whileCounter += 1
   }
  }

  randomCellFloor() {
    let whileCounter = 0
    let j
    let i
    while (whileCounter < this.fieldCells[0].length * 2) {
      j = this.fieldCells.length - 1
      i = this.getRandomInt(0, this.fieldCells[0].length)
      // logSomeText("In chooseRandomStartCell()")
      console.log('In chooseRandomStartCell()')

      if (this.fieldCells[j][i].type === TYPE_FIELD) {
        return this.fieldCells[j][i]
      }
      whileCounter += 1
   }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min // Максимум не включается, минимум включается
  }

  gererateGenome() {
    const genome = new Array(GENOME_COUNT).fill(0)
    .map(() => {
      return {
        // feature for future
        // upGen: {
        //   nextGen: this.getRandomInt(0, GENOME_MAX_VALUE),
        // },
        upGen: this.getRandomInt(0, GENOME_MAX_VALUE),
        downGen: this.getRandomInt(0, GENOME_MAX_VALUE),
        leftGen: this.getRandomInt(0, GENOME_MAX_VALUE),
        rightGen: this.getRandomInt(0, GENOME_MAX_VALUE),
      }
    })
    console.log('genome', genome)
    return genome
  }

  refreshLastCell() {
    this.lastCell = this.cells[this.cells.length - 1]
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
    const randomValue = this.getRandomInt(0, freeCells.length)
    return freeCells[randomValue]
  }

  addNextCell(j, i) {
    // console.log(`next i and j`, i, j);
    this.lastCell.setColor(this.bodyColor)
    const nextCell = this.fieldCells[j][i]
    nextCell.setColor(this.headColor)
    nextCell.setCellType()

    this.counterCellAll = this.counterCellAll + 1
    this.counterCell = this.counterCell + 1
    if (this.counterCellAll < 0) {
      throw new Error("no cell counterCellAll");
    }
    nextCell.indexInTree = this.counterCellAll
    nextCell.parentTree = this
    this.cells.push(nextCell)
    this.refreshLastCell()
    // this.nextCell = nextCell
    this.createCellLog()
  }

  createCellLog() {
    // let logText = "Create cell column:" + this.lastCell.i + ", raw:" + this.lastCell.j +", TreeID: "+this.id
    const logObject = {
      i: this.lastCell.i,
      j: this.lastCell.j,
      id: this.id,
      type: 'create',
      headColor: this.headColor,
      bodyColor: this.bodyColor,
    }
    this.logTextArray.push(logObject)
    if (this.logTextArray.length > 50) {
      this.logTextArray.shift()
    }
  }

  reset() {
    this.isFreeCellsAround = true
    this.cells = []
    this.lastCell = null
  }

  deleteEmptyTrees() {
    const treeIndex = this.digitalTrees.findIndex(tree => tree.cells.length === 0)
    if (treeIndex !== -1) {
      this.digitalTrees.splice(treeIndex, 1)
    }
  }
}
