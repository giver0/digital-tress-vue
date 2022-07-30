import {
  TYPE_FIELD,
  BASIC_COLOR,
  GENOME_COUNT,
  GENOME_MAX_VALUE,
} from '@/constant/basic'

export default class treeObject {
  constructor(
    digitalTrees,
    fieldCells,
    logTextArray,
    genome = this.gererateGenome(),
    headColor = this.generateRandomColor(),
    bodyColor = this.generateRandomColor(),
  ) {
    this.digitalTrees = digitalTrees
    this.fieldCells = fieldCells
    this.logTextArray = logTextArray
    this.id = this.generateID()
    this.cells = []
    this.counterCell = 0
    this.counterCellAll = 0
    this.lastCell = null
    this.isFreeCellsAround = true
    this.headColor = headColor
    this.bodyColor = bodyColor
    this.positionCurrent = null
    this.positionNext = null
    this.energy = 20
    this.genome = genome
    this.lastIncreaseEnergy = 0
    this.lastReduceEnergy = 0
    digitalTrees.push(this)
  }

  generateRandomColor() {
    let randomColor = BASIC_COLOR
    while (randomColor === BASIC_COLOR) {
      randomColor = '#'
      randomColor += Math.floor(Math.random() * 16777215).toString(16)
    }
    return randomColor
  }

  generateID() {
    const length = 6
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  addFirstCell() {
    try {
      const firstCell = this.randomCellFloor()
      this.cells.push(firstCell)

      this.cells[0].setColor(this.headColor)
      this.cells[0].setCellType()
      this.cells[0].parentTree = this
      this.cells[0].indexInTree = this.cells.length - 1
      this.cells[0].genome = 0
      this.refreshLastCell()
      this.createCellLog()
    } catch (error) {
      console.log('========== Some Error ==========')
      console.log(error)
    }
  }

  addCellFromParent(cell) {
    this.cells.push(cell)
    this.counterCell = 1
    this.counterCellAll = 1
    this.refreshLastCell()
    this.lastCell.color = this.headColor
    this.lastCell.genome = 0
    this.lastCell.parentTree = this
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
        upGen: this.getRandomInt(0, GENOME_MAX_VALUE),
        downGen: this.getRandomInt(0, GENOME_MAX_VALUE),
        leftGen: this.getRandomInt(0, GENOME_MAX_VALUE),
        rightGen: this.getRandomInt(0, GENOME_MAX_VALUE),
      }
    })
    console.log('genome', genome)
    return genome
  }

  mutateGenome() {
    const randomGenomRaw = this.getRandomInt(0, GENOME_COUNT)
    const randomGenDirection = () => {
      const randomInt = this.getRandomInt(0, 4)
      if (randomInt === 0) {
        this.genome[randomGenomRaw].upGen = this.getRandomInt(0, GENOME_MAX_VALUE)
      }
      if (randomInt === 1) {
        this.genome[randomGenomRaw].downGen = this.getRandomInt(0, GENOME_MAX_VALUE)
      }
      if (randomInt === 2) {
        this.genome[randomGenomRaw].leftGen = this.getRandomInt(0, GENOME_MAX_VALUE)
      }
      if (randomInt === 3) {
        this.genome[randomGenomRaw].rightGen = this.getRandomInt(0, GENOME_MAX_VALUE)
      }
    }
  }

  refreshLastCell() {
    this.lastCell = this.cells[this.cells.length - 1]
  }

  chooseAction() {
    if (this.lastCell.isCellFalling) {
      // console.time('moveCellDown')
      this.moveCellDown()
      // console.timeEnd('moveCellDown')
    } else {
      // console.time('realiseGenome')
      this.realiseGenome()
      // this.createCell()
      // console.timeEnd('realiseGenome')
    }
    // console.time('refreshEnergy')
    this.refreshEnergy()
    // console.timeEnd('refreshEnergy')
  }

  realiseGenome() {
    this.cells.forEach(cell => {
      if (cell.color === this.headColor) {
        const cellGenome = this.genome[cell.genome]
        // for (const gen in cellGenome) {
        //   cellGenome[gen]

        // }
        // console.log('cellGenome', cellGenome);
        let newI = null
        let newJ = null
        if (cellGenome.upGen <= 15) {
          newI = cell.i
          newJ = cell.j - 1
          if (this.isNextCellField(newI, newJ)) {
            this.createCellGenome(cell, newI, newJ, cellGenome.upGen)
          }
        }
        if (cellGenome.downGen <= 15) {
          newI = cell.i
          newJ = cell.j + 1
          if (this.isNextCellField(newI, newJ)) {
            this.createCellGenome(cell, newI, newJ, cellGenome.downGen)
          }
        }
        if (cellGenome.leftGen <= 15) {
          newI = cell.i - 1
          newJ = cell.j
          if (this.isNextCellField(newI, newJ)) {
            this.createCellGenome(cell, newI, newJ, cellGenome.leftGen)
          }
        }
        if (cellGenome.rightGen <= 15) {
          newI = cell.i + 1
          newJ = cell.j
          if (this.isNextCellField(newI, newJ)) {
            this.createCellGenome(cell, newI, newJ, cellGenome.rightGen)
          }
        }
      }
    })
  }

  createCellGenome(cell, newI, newJ, genomeToImplement) {
    // console.log(`next i and j`, i, j);
    cell.setColor(this.bodyColor)
    const nextCell = this.fieldCells[newJ][newI]
    nextCell.setColor(this.headColor)
    nextCell.setCellType()

    this.counterCellAll = this.counterCellAll + 1
    this.counterCell = this.counterCell + 1
    nextCell.indexInTree = this.counterCellAll
    nextCell.genome = genomeToImplement
    nextCell.parentTree = this
    this.cells.push(nextCell)
    this.refreshLastCell()
    this.createCellLog()
  }

  isNextCellField(newI, newJ) {
    if (newJ in this.fieldCells && newI in this.fieldCells[newJ]) {
      return this.fieldCells[newJ][newI]?.color === BASIC_COLOR
    } else {
      return false
    }
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

  changeRandomColor() {
    this.headColor = this.generateRandomColor()
    this.bodyColor = this.generateRandomColor()
  }

  moveCellDown() {
    // console.log('i:', this.i, 'j:', this.j, 'Tree id:', this.parentTree);
    // console.log('field move', this.fieldCells[this.j][this.i]);
    if (this.lastCell.j === this.fieldCells.length - 1) {
      // console.log('At bottom');
      this.lastCell.isCellFalling = false
      this.lastCell.isFreeCellsAround = true
      this.realiseGenome()
    } else {
      // const nextJ = this.j + 1
      // console.log('need move');
      this.positionCurrent = this.lastCell
      this.positionNext = this.fieldCells[this.positionCurrent.j + 1][this.positionCurrent.i]
      // console.log('positionNext', this.positionNext);
      const isBottomCellField = this.positionNext.type === TYPE_FIELD
      // console.log('isBottomCellField', isBottomCellField);
      if (isBottomCellField) {
        // console.log('moveTo');
        // console.log(this);

        const keyToCopy = [
          'type',
          'color',
          'parentTree',
          'isCellFalling',
          'indexInTree',
        ]

        keyToCopy.forEach(key => {
          this.positionNext[key] = this.positionCurrent[key]
        })

        this.lastCell = this.positionNext
        this.cells[0] = this.positionNext
        this.positionCurrent.setFieldType()
      }
    }
  }

  refreshEnergy() {
    // console.time('increaseEnergy')
    this.increaseEnergy()
    // console.timeEnd('increaseEnergy')
    // console.time('reduceEnergy')
    this.reduceEnergy()
    // console.timeEnd('reduceEnergy')
    // console.time('checkIsEnergyOver')
    this.checkIsEnergyOver()
    // console.timeEnd('checkIsEnergyOver')
  }

  increaseEnergy() {
    let generatedEnergyByCell = 0
    this.cells.forEach(cell => {
      generatedEnergyByCell = generatedEnergyByCell + cell.generatedEnergyByCell()
    })
    this.lastIncreaseEnergy = generatedEnergyByCell
    this.energy = this.energy + generatedEnergyByCell
  }

  reduceEnergy() {
    this.lastReduceEnergy = this.cells.length
    this.energy = this.energy - this.cells.length
  }

  checkIsEnergyOver() {
    const isEnergyOver = this.energy < 0
    if (isEnergyOver) {
      if (this.cells.length <= 1) {
        this.allCellToField
        this.deleteAllCells()
      } else {
        this.deleteTreeBody()
        this.createTreeFromHeadCell()
      }
      // this.deleteEmptyTrees()
    }
  }

  deleteTreeBody() {
    // console.log('in delete body');

    this.cells.forEach(cell => {
      if (cell.color === this.bodyColor) {
        cell.setFieldType()
      }
    })
    this.cells = this.cells.filter(cell => cell.color === this.headColor)

    this.cells.forEach(cell => cell.cellFalling())

    this.counterCell = 1
  }

  createTreeFromHeadCell() {
    this.cells.forEach(cell => {
      const newTree = new treeObject(
        this.digitalTrees,
        this.fieldCells,
        this.logTextArray,
        this.genome,
        this.headColor,
        this.bodyColor,
      )
      newTree.addCellFromParent(cell)
      newTree.mutateGenome()
    })
  }

  allCellToField() {
    this.cells.forEach(cell => cell.setFieldType)
  }

  deleteAllCells() {
    this.cells = []
    this.lastCell = {}
  }

  deleteEmptyTrees() {
    const treeIndex = this.digitalTrees.findIndex(tree => tree.cells.length === 0)
    if (treeIndex !== -1) {
      this.digitalTrees.splice(treeIndex, 1)
    }
  }
}
