import {
  TYPE_FIELD,
  BASIC_COLOR,
  GENOME_COUNT,
  GENOME_MAX_VALUE,
} from "@/constant/basic"

export default class treeObject {
  constructor(digitalTrees) {
    this.id = digitalTrees.length
    this.cells = []
    this.counterCell = 0
    this.counterCellAll = 0
    this.lastCell = null
    this.headColor = null
    this.bodyColor = null
    this.isFreeCellsAround = true
    this.headColor = this.generateRandomColor()
    this.bodyColor = this.generateRandomColor()
    this.positionCurrent = null
    this.positionNext = null
    this.energy = 10
    this.genome = this.gererateGenome()
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

  addFirstCell(fieldCells, logTextArray) {
    try {
      const firstCell = this.randomCellFloor(
        fieldCells,
      )
      this.cells.push(firstCell)

      this.cells[0].setColor(this.headColor)
      this.cells[0].setCellType()
      this.cells[0].parentTree = this
      this.cells[0].indexInTree = this.cells.length - 1
      this.cells[0].genome = 0
      this.refreshLastCell()
      this.createCellLog(logTextArray)
    } catch (error) {
      console.log('========== Some Error ==========')
      console.log(error)
    }
  }

  chooseRandomStartCell(fieldCells) {
    let whileCounter = 0
    let j
    let i
    while (whileCounter < fieldCells.length * fieldCells[0].length) {
      j = this.getRandomInt(0, fieldCells.length)
      i = this.getRandomInt(0, fieldCells[0].length)
      // logSomeText("In chooseRandomStartCell()")
      console.log('In chooseRandomStartCell()')

      if (fieldCells[j][i].color === BASIC_COLOR) {
        return fieldCells[j][i]
      }
      whileCounter += 1
   }
  }

  randomCellFloor(fieldCells) {
    let whileCounter = 0
    let j
    let i
    while (whileCounter < fieldCells[0].length * 2) {
      j = fieldCells.length - 1
      i = this.getRandomInt(0, fieldCells[0].length)
      // logSomeText("In chooseRandomStartCell()")
      console.log('In chooseRandomStartCell()')

      if (fieldCells[j][i].type === TYPE_FIELD) {
        return fieldCells[j][i]
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
    console.log('genome', genome);
    return genome
  }

  refreshLastCell() {
    this.lastCell = this.cells[this.cells.length - 1]
  }

  chooseAction(fieldCells, logTextArray) {
    if (this.lastCell.isCellFalling) {
      // this.moveCellDown(fieldCells)
      this.moveCellDown(fieldCells, logTextArray)
    } else {
      this.realiseGenome(fieldCells, logTextArray)
      // this.createCell(fieldCells, logTextArray)
    }
    this.refreshEnergy(fieldCells)
  }

  realiseGenome(fieldCells, logTextArray) {
    this.cells.forEach(cell => {
      if (cell.color === this.headColor) {
        const cellGenome = this.genome[cell.genome]
        // for (const gen in cellGenome) {
        //   cellGenome[gen]

        // }
        console.log('cellGenome', cellGenome);
        let newI = null
        let newJ = null
        if (cellGenome.upGen <= 15) {
          newI = cell.i
          newJ = cell.j - 1
          if (this.isNextCellField(fieldCells, newI, newJ)) {
            this.createCellGenome(cell, fieldCells, logTextArray, newI, newJ, cellGenome.upGen)
          }
        }
        if (cellGenome.downGen <= 15) {
          newI = cell.i
          newJ = cell.j + 1
          if (this.isNextCellField(fieldCells, newI, newJ)) {
            this.createCellGenome(cell, fieldCells, logTextArray, newI, newJ, cellGenome.downGen)
          }
        }
        if (cellGenome.leftGen <= 15) {
          newI = cell.i - 1
          newJ = cell.j
          if (this.isNextCellField(fieldCells, newI, newJ)) {
            this.createCellGenome(cell, fieldCells, logTextArray, newI, newJ, cellGenome.leftGen)
          }
        }
        if (cellGenome.rightGen <= 15) {
          newI = cell.i + 1
          newJ = cell.j
          if (this.isNextCellField(fieldCells, newI, newJ)) {
            this.createCellGenome(cell, fieldCells, logTextArray, newI, newJ, cellGenome.rightGen)
          }
        }
      }
    })
  }

  createCellGenome(cell, fieldCells, logTextArray, newI, newJ, genomeToImplement) {
    // console.log(`next i and j`, i, j);
    cell.setColor(this.bodyColor)
    const nextCell = fieldCells[newJ][newI]
    nextCell.setColor(this.headColor)
    nextCell.setCellType()

    this.counterCellAll = this.counterCellAll + 1
    this.counterCell = this.counterCell + 1
    nextCell.indexInTree = this.counterCellAll
    nextCell.genome = genomeToImplement
    nextCell.parentTree = this
    this.cells.push(nextCell)
    this.refreshLastCell()
    this.createCellLog(logTextArray)
  }

  isNextCellField(fieldCells, newI, newJ) {
    if (newJ in fieldCells && newI in fieldCells[newJ]) {
      return fieldCells[newJ][newI]?.color === BASIC_COLOR
    } else {
      return false
    }
  }

  createCell(fieldCells, logTextArray) {
    const freeCellsArray = this.FreeCellsAround2(
      this.lastCell,
      fieldCells,
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
      this.addNextCell(j, i, fieldCells, logTextArray)
    }
  }

  FreeCellsAround(cell, fieldCells) {
    // console.log('in free cell');
    // console.log(cell.i, ' ', cell.j);
    const freeFields = []
    let i = cell.i - 1
    let j = cell.j - 1
    const iEnd = cell.i + 2
    const jEnd = cell.j + 2

    for (; j < jEnd; j++) {
      for (i = cell.i - 1; i < iEnd; i++) {
        if (this.isCoordinateInField(i, j, fieldCells)) {
          if (fieldCells[j][i].color === BASIC_COLOR) {
            freeFields.push([j, i])
          }
        }
      }
    }
    return freeFields
  }

  FreeCellsAround2(cell, fieldCells) {
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
        if (j in fieldCells && i in fieldCells[j]) {
          if (fieldCells[j][i].type === TYPE_FIELD) {
            freeFields.push([j, i])
          }
        }
      }
    }
    return freeFields
  }

  isCoordinateInField(i, j, fieldCells) {
    return i >= 0 && i < fieldCells[0].length && j >= 0 && j < fieldCells.length
  }

  chooseRandomPoint(freeCells) {
    const randomValue = this.getRandomInt(0, freeCells.length)
    return freeCells[randomValue]
  }

  addNextCell(j, i, fieldCells, logTextArray) {
    // console.log(`next i and j`, i, j);
    this.lastCell.setColor(this.bodyColor)
    const nextCell = fieldCells[j][i]
    nextCell.setColor(this.headColor)
    nextCell.setCellType()

    this.counterCellAll = this.counterCellAll + 1
    this.counterCell = this.counterCell + 1
    nextCell.indexInTree = this.counterCellAll
    nextCell.parentTree = this
    this.cells.push(nextCell)
    this.refreshLastCell()
    // this.nextCell = nextCell
    this.createCellLog(logTextArray)
  }

  createCellLog(logTextArray) {
    // let logText = "Create cell column:" + this.lastCell.i + ", raw:" + this.lastCell.j +", TreeID: "+this.id
    const logObject = {
      i: this.lastCell.i,
      j: this.lastCell.j,
      id: this.id,
      type: 'create',
      headColor: this.headColor,
      bodyColor: this.bodyColor,
    }
    logTextArray.push(logObject)
    if (logTextArray.length > 100) {
      logTextArray.shift()
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

  deleteTreeBody() {
    // console.log('in delete body');

    for (let index = 0; index < this.cells.length - 1; index++) {
      this.cells[index].setFieldType()
    }
    // console.log(this.cells);
    while (this.cells.length > 1) {
      this.cells.shift()
    }
    // console.log(this.cells.length);
    // console.log('cells', this.cells);
    this.counterCell = 1
  }

  moveCellDown(fieldCells, logTextArray) {
    // console.log('i:', this.i, 'j:', this.j, 'Tree id:', this.parentTree);
    // console.log('field move', fieldCells[this.j][this.i]);
    if (this.lastCell.j === fieldCells.length - 1) {
      // console.log('At bottom');
      this.lastCell.isCellFalling = false
      this.lastCell.isFreeCellsAround = true
      this.createCell(fieldCells, logTextArray)
    } else {
      // const nextJ = this.j + 1
      // console.log('need move');
      this.positionCurrent = this.lastCell
      this.positionNext = fieldCells[this.positionCurrent.j + 1][this.positionCurrent.i]
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

  refreshEnergy(fieldCells) {
    let upperCellsIsField = this.cells.map(cell => {
      const isCellAtUpperPoint = cell.j === 0
      if (isCellAtUpperPoint) {
        return cell
      }
      const isUpperCellField = fieldCells[cell.j - 1][cell.i]?.type === TYPE_FIELD

      if (isUpperCellField || isCellAtUpperPoint) {
        return cell
      }
    })

    upperCellsIsField = upperCellsIsField.filter(cell => cell !== undefined)
    let generatedEnergy = 0
    upperCellsIsField?.forEach(cell => generatedEnergy = generatedEnergy + cell.generatedEnergyByCell(fieldCells))
    // console.log('generatedEnergy', generatedEnergy);

    // console.log('upper cells', upperCellsIsField, upperCellsIsField.length);
    this.energy = this.energy - this.cells.length + generatedEnergy
  }
}
