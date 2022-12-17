import {
  TYPE_FIELD,
  BASIC_COLOR,
  GENOME_COUNT,
  GENOME_MAX_VALUE,
} from '@/constant/basic'
import treeObject from '@/components/classes/treeObject'
import useGeneral from '@/use/use-general'
import useConsole from '@/use/use-console'
import useCell from '@/use/use-cell'

export const useTrees = () => {
  const {
    getRandomInt,
    changeLittleBitColor,
  } = useGeneral()
  const {
    consoleLog,
  } = useConsole()
  const {
    setCellType,
    setCellColor,
    setFieldType,
    createCellLog,
    setCellFalling,
    getGeneratedEnergyByCell,
  } = useCell()

  function chooseAction(tree, fieldCells, digitalTrees) {
    if (tree.lastCell.isCellFalling) {
      moveCellDown(tree, fieldCells)
    } else {
      realiseGenome(tree, fieldCells)
      // tree.createCell()
    }
    refreshEnergy(tree, digitalTrees, fieldCells)
  }

  function realiseGenome(tree, fieldCells) {
    consoleLog('realiseGenome')
    if (!fieldCells) {
    console.log('tree :>> ', tree);
      throw new Error("fieldCells should be defined");
    }
    tree.cells.forEach(cell => {
      if (cell.color === tree.headColor) {
        const cellGenome = tree.genome[cell.genome]
        // for (const gen in cellGenome) {
        //   cellGenome[gen]

        // }
        // console.log('cellGenome', cellGenome);
        let newI = null
        let newJ = null
        if (cellGenome.upGen <= 15) {
          newI = cell.i
          newJ = cell.j - 1
          if (isNextCellField(newI, newJ, fieldCells)) {
            createCellGenome(cell, newI, newJ, cellGenome.upGen, tree, fieldCells)
          }
        }
        if (cellGenome.downGen <= 15) {
          newI = cell.i
          newJ = cell.j + 1
          if (isNextCellField(newI, newJ, fieldCells)) {
            createCellGenome(cell, newI, newJ, cellGenome.downGen, tree, fieldCells)
          }
        }
        if (cellGenome.leftGen <= 15) {
          newI = cell.i - 1
          newJ = cell.j
          if (isNextCellField(newI, newJ, fieldCells)) {
            createCellGenome(cell, newI, newJ, cellGenome.leftGen, tree, fieldCells)
          }
        }
        if (cellGenome.rightGen <= 15) {
          newI = cell.i + 1
          newJ = cell.j
          if (isNextCellField(newI, newJ, fieldCells)) {
            createCellGenome(cell, newI, newJ, cellGenome.rightGen, tree, fieldCells)
          }
        }
      }
    })
  }

  function isNextCellField(newI, newJ, fieldCells) {
    try {
      if (newJ in fieldCells && newI in fieldCells[newJ]) {
        return fieldCells[newJ][newI]?.color === BASIC_COLOR
      } else {
        return false
      }
    } catch (error) {
      console.error('error :>> ', error);
      console.log('fieldCells :>> ', fieldCells);
      // new Error()
      throw new Error("Something went badly wrong!");
      // console.log('newI :>> ', newI);
      // console.log('newJ :>> ', newJ);
    }
  }

  function moveCellDown(tree, fieldCells) {
    consoleLog('moveCellDown')
    // console.log('i:', tree.i, 'j:', tree.j, 'Tree id:', tree.parentTree);
    // console.log('field move', fieldCells[tree.j][tree.i]);
    if (tree.lastCell.j === fieldCells.length - 1) {
      // console.log('At bottom');
      tree.lastCell.isCellFalling = false
      tree.lastCell.isFreeCellsAround = true
      realiseGenome(tree, fieldCells)
    } else {
      // const nextJ = tree.j + 1
      // console.log('need move');
      tree.positionCurrent = tree.lastCell
      tree.positionNext = fieldCells[tree.positionCurrent.j + 1][tree.positionCurrent.i]
      // console.log('positionNext', tree.positionNext);
      const isBottomCellField = tree.positionNext.type === TYPE_FIELD
      // console.log('isBottomCellField', isBottomCellField);
      if (isBottomCellField) {
        // console.log('moveTo');
        // console.log(tree);

        const keyToCopy = [
          'type',
          'color',
          'parentTree',
          'isCellFalling',
          'indexInTree',
        ]

        keyToCopy.forEach(key => {
          tree.positionNext[key] = tree.positionCurrent[key]
        })

        tree.lastCell = tree.positionNext
        tree.cells[0] = tree.positionNext
        setFieldType(tree.positionCurrent)
      }
    }
  }

  function createCellGenome(cell, newI, newJ, genomeToImplement, tree, fieldCells) {
    // console.log(`next i and j`, i, j);
    setCellColor(tree.bodyColor, cell)
    const nextCell = fieldCells[newJ][newI]
    setCellColor(tree.headColor, nextCell)
    setCellType(nextCell)

    tree.counterCellAll = tree.counterCellAll + 1
    tree.counterCell = tree.counterCell + 1
    nextCell.indexInTree = tree.counterCellAll
    consoleLog('nextCell.indexInTree :>> ', nextCell.indexInTree)
    nextCell.genome = genomeToImplement
    nextCell.parentTree = tree
    tree.cells.push(nextCell)
    refreshLastCell(tree)
    createCellLog(tree)
  }

  function refreshLastCell(tree) {
    tree.lastCell = tree.cells[tree.cells.length - 1]
  }

  function refreshEnergy(tree, digitalTrees, fieldCells) {
    consoleLog('refreshEnergy')
    increaseEnergy(tree, fieldCells)
    reduceEnergy(tree)
    checkIsEnergyOver(tree, digitalTrees, fieldCells)
  }

  function increaseEnergy(tree, fieldCells) {
    consoleLog('increaseEnergy')
    let generatedEnergyByCell = 0
    tree.cells.forEach(cell => {
      generatedEnergyByCell = generatedEnergyByCell + getGeneratedEnergyByCell(cell, fieldCells)
    })
    tree.lastIncreaseEnergy = generatedEnergyByCell
    tree.energy = tree.energy + generatedEnergyByCell
  }

  function reduceEnergy(tree) {
    consoleLog('reduceEnergy')
    tree.lastReduceEnergy = tree.cells.length
    tree.energy = tree.energy - tree.cells.length
  }

  function checkIsEnergyOver(tree, digitalTrees, fieldCells) {
    consoleLog('checkIsEnergyOver')
    const isEnergyOver = tree.energy < 0
    if (isEnergyOver) {
      if (tree.cells.length <= 1) {
        consoleLog('1 cell')
        allCellToField(tree)
        deleteAllCells(tree)
      } else {
        consoleLog('more then 1 cell')
        deleteTreeBody(tree)
        createTreeFromHeadCell(tree, fieldCells)
      }
      // isIt work correct?
      // deleteEmptyTrees(digitalTrees)
    }
  }

  function allCellToField(tree) {
    // is it correct?
    tree.cells.forEach(cell => {
      setFieldType(cell)
    })
  }

  function deleteAllCells(tree) {
    tree.cells = []
    tree.lastCell = {}
  }

  function deleteTreeBody(tree) {
    // console.log('in delete body');

    tree.cells.forEach(cell => {
      if (cell.color === tree.bodyColor) {
        setFieldType(cell)
      }
    })
    tree.cells = tree.cells.filter(cell => cell.color === tree.headColor)
  }

  function createTreeFromHeadCell(tree, fieldCells) {
    tree.cells.forEach(cell => setCellFalling(cell))
    tree.counterCell = 1
    tree.cells.forEach(cell => {
      const newTree = new treeObject(
        tree.digitalTrees,
        fieldCells,
        tree.logTextArray,
        tree.genome,
        changeLittleBitColor(tree.headColor),
        changeLittleBitColor(tree.bodyColor),
      )
      addCellFromParent(cell, newTree)
      mutateGenome(newTree)
    })
    tree.cells = []
  }

  function addCellFromParent(cell, newTree) {
    newTree.cells.push(cell)
    newTree.counterCell = 1
    newTree.counterCellAll = 1
    refreshLastCell(newTree)
    newTree.lastCell.color = newTree.headColor
    newTree.lastCell.genome = 0
    // maybe something wring here
    newTree.cells[0].parentTree = newTree
    newTree.lastCell.parentTree = newTree
  }

  function deleteEmptyTrees(digitalTrees) {
    const treeIndex = digitalTrees.findIndex(tree => tree.cells.length === 0)
    if (treeIndex !== -1) {
      digitalTrees.splice(treeIndex, 1)
    }
  }

  function mutateGenome(tree) {
    const randomGenomRaw = getRandomInt(0, GENOME_COUNT)
    const randomGenDirection = () => {
      const randomInt = getRandomInt(0, 4)
      if (randomInt === 0) {
        tree.genome[randomGenomRaw].upGen = getRandomInt(0, GENOME_MAX_VALUE)
      }
      if (randomInt === 1) {
        tree.genome[randomGenomRaw].downGen = getRandomInt(0, GENOME_MAX_VALUE)
      }
      if (randomInt === 2) {
        tree.genome[randomGenomRaw].leftGen = getRandomInt(0, GENOME_MAX_VALUE)
      }
      if (randomInt === 3) {
        tree.genome[randomGenomRaw].rightGen = getRandomInt(0, GENOME_MAX_VALUE)
      }
    }
  }

  function changeRandomColor(tree) {
    tree.headColor = tree.generateRandomColor()
    tree.bodyColor = tree.generateRandomColor()
  }

  function treeReset(tree) {
    tree.isFreeCellsAround = true
    tree.cells = []
    tree.lastCell = null
  }

  function addFirstCell(tree, fieldCells) {
    const firstCell = randomCellFloor(tree, fieldCells)
    tree.cells.push(firstCell)

    setCellColor(tree.headColor, tree.cells[0])
    setCellType(tree.cells[0])
    tree.cells[0].parentTree = tree
    console.log('tree.cells :>> ', tree.cells);
    tree.cells[0].indexInTree = tree.cells.length - 1
    tree.cells[0].genome = 0
    refreshLastCell(tree)
    createCellLog(tree)
  }

  function randomCellFloor(tree, fieldCells) {
    let whileCounter = 0
    let j
    let i
    while (whileCounter < fieldCells[0].length * 2) {
      j = fieldCells.length - 1
      i = getRandomInt(0, fieldCells[0].length)
      // logSomeText("In chooseRandomStartCell()")
      console.log('In chooseRandomStartCell()')

      if (fieldCells[j][i].type === TYPE_FIELD) {
        return fieldCells[j][i]
      }
      whileCounter += 1
   }
  }

  function refreshLastCell(tree) {
    tree.lastCell = tree.cells[tree.cells.length - 1]
  }

  function addNextCell(j, i, tree) {
    // console.log(`next i and j`, i, j);
    setCellColor(tree.bodyColor, tree.lastCell)
    const nextCell = tree.fieldCells[j][i]
    setCellColor(tree.headColor, nextCell)
    setCellType(nextCell)

    tree.counterCellAll = tree.counterCellAll + 1
    tree.counterCell = tree.counterCell + 1
    if (tree.counterCellAll < 0) {
      throw new Error("no cell counterCellAll");
    }
    nextCell.indexInTree = tree.counterCellAll
    nextCell.parentTree = tree
    tree.cells.push(nextCell)
    refreshLastCell(tree)
    // tree.nextCell = nextCell
    createCellLog(tree)
  }

  // function whys don't used?
  function createCell(tree, fieldCells) {
    const freeCellsArray = freeCellsAround2(tree, fieldCells)
    // console.log('freeCellsArray', freeCellsArray);

    if (freeCellsArray.length === 0) {
      tree.isFreeCellsAround = false
      tree.lastCell.isCellFalling = true
      if (tree.counterCell > 1) {
        tree.deleteTreeBody()
      }
    } else {
      const FreeCellCoordinate = chooseRandomPoint(freeCellsArray)
      const [j, i] = FreeCellCoordinate
      addNextCell(j, i, tree)
    }
  }

  function freeCellsAround2(tree, fieldCells) {
    // console.log('in free cell');
    // console.log(tree.lastCell.i, ' ', tree.lastCell.j);
    const freeFields = []
    let i = tree.lastCell.i - 1
    let j = tree.lastCell.j - 1
    const iEnd = tree.lastCell.i + 2
    const jEnd = tree.lastCell.j + 2
    const fieldToCheck = []

    for (let index = j; index < jEnd; index++) {

    }

    for (; j < jEnd; j++) {
      for (i = tree.lastCell.i - 1; i < iEnd; i++) {
        if (j in fieldCells && i in fieldCells[j]) {
          if (fieldCells[j][i].type === TYPE_FIELD) {
            freeFields.push([j, i])
          }
        }
      }
    }
    return freeFields
  }

  function chooseRandomPoint(freeCells) {
    const randomValue = getRandomInt(0, freeCells.length)
    return freeCells[randomValue]
  }

  return {
    treeReset,
    addFirstCell,
    chooseAction,
    allCellToField,
    deleteAllCells,
    refreshLastCell,
    changeRandomColor,
  }
}

export default useTrees
