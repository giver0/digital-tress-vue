export default class treeObject {
  constructor(digitalTrees) {
    this.id = digitalTrees.length
    this.cells = []
    this.lastCell = null
    this.headColor = null
    this.bodyColor = null
    this.counterBox = null
    this.counterCellBlock = null
    this.counterCellText = null
    this.isFreeCellsAround = true
    this.headColor = this.generateRandomColor()
    this.bodyColor = this.generateRandomColor()
    digitalTrees.push(this)
  }
  generateRandomColor() {
    let randomColor = '#808080'
    while (randomColor === '#808080') {
      randomColor = '#'
      randomColor += Math.floor(Math.random() * 16777215).toString(16)
    }
    return randomColor
  }
  addFirstCell(fieldCells, basicColor, logTextArray) {
    try {
      const firstCell = this.randomCellFloor(
        fieldCells,
        basicColor,
      )
      console.log(firstCell)
      console.log(firstCell.elementById)
      this.cells.push(firstCell)

      this.cells[0].setColor(this.headColor)
      this.cells[0].setCellType()
      this.cells[0].parentTree = this
      this.cells[0].indexInTree = this.cells.length - 1
      this.refreshLastCell()
      this.createCellLog(logTextArray)
    } catch (error) {
      console.log('========== Some Error ==========')
      console.log(error)
    }
  }
  chooseRandomStartCell(fieldCells, basicColor) {
    let whileCounter = 0
    let j
    let i
    while (whileCounter < fieldCells.length * fieldCells[0].length) {
      j = this.getRandomInt(0, fieldCells.length)
      i = this.getRandomInt(0, fieldCells[0].length)
      // logSomeText("In chooseRandomStartCell()")
      console.log('In chooseRandomStartCell()')

      if (fieldCells[j][i].color === basicColor) {
        return fieldCells[j][i]
      }
      whileCounter += 1
   }
  }
  randomCellFloor(fieldCells, basicColor) {
    let whileCounter = 0
    let j
    let i
    while (whileCounter < fieldCells[0].length * 2) {
      j = fieldCells.length - 1
      i = this.getRandomInt(0, fieldCells[0].length)
      // logSomeText("In chooseRandomStartCell()")
      console.log('In chooseRandomStartCell()')

      if (fieldCells[j][i].type === 'field') {
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
  getBackgroundColor(elementById) {
    return window.getComputedStyle(elementById, null).getPropertyValue('background-color')
  }
  refreshLastCell() {
    this.lastCell = this.cells[this.cells.length - 1]
  }
    // createCellTree() {
    //       createCell(this.lastCell)
    //   }
  createCell(basicColor, fieldCells, logTextArray) {
    const freeCellsArray = this.FreeCellsAround(
      this.lastCell,
      basicColor,
      fieldCells,
    )

    if (freeCellsArray.length === 0) {
      this.isFreeCellsAround = false
    } else {
      const FreeCellCoordinate = this.chooseRandomPoint(freeCellsArray)
      const [j, i] = FreeCellCoordinate
      this.addNextCell(j, i, fieldCells, logTextArray)
    }
  }
  FreeCellsAround(cell, basicColor, fieldCells) {
    const freeFields = []
    let i = cell.i - 1
    let j = cell.j - 1
    const iEnd = cell.i + 2
    const jEnd = cell.j + 2

    for (; j < jEnd; j++) {
      for (i = cell.i - 1; i < iEnd; i++) {
        if (this.isCoordinateInField(i, j, fieldCells)) {
          if (fieldCells[j][i].color === basicColor) {
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

  // isCellGray(j, i) {
  //   return getBackgroundColor(fieldCells[j][i].elementById) === grayString;
  // }

  addNextCell(j, i, fieldCells, logTextArray) {
    this.lastCell.setColor(this.bodyColor)
    const nextCell = fieldCells[j][i]
    nextCell.setColor(this.headColor)
    nextCell.setCellType()
    this.cells.length - 1

    nextCell.indexInTree = this.cells.length - 1
    nextCell.previousCell = this.lastCell
    nextCell.parentTree = this
    this.cells.push(nextCell)
    nextCell.parentTree.refreshLastCell()
    this.nextCell = nextCell
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
}
