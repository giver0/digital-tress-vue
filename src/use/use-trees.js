import {
  TYPE_FIELD,
  BASIC_COLOR,
  GENOME_COUNT,
  GENOME_MAX_VALUE,
} from '@/constant/basic'
import treeObject from '@/components/classes/treeObject'

export const useTrees = () => {
  function chooseAction(tree, fieldCells, digitalTrees) {
    if (tree.lastCell.isCellFalling) {
      // console.time('moveCellDown')
      moveCellDown(tree, fieldCells)
      // console.timeEnd('moveCellDown')
    } else {
      // console.time('realiseGenome')
      realiseGenome(tree, fieldCells)
      // tree.createCell()
      // console.timeEnd('realiseGenome')
    }
    // console.time('refreshEnergy')
    refreshEnergy(tree, digitalTrees)
    // console.timeEnd('refreshEnergy')
  }

  function realiseGenome(tree, fieldCells) {
    console.log('realiseGenome')
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
            createCellGenome(cell, newI, newJ, cellGenome.upGen, tree)
          }
        }
        if (cellGenome.downGen <= 15) {
          newI = cell.i
          newJ = cell.j + 1
          if (isNextCellField(newI, newJ, fieldCells)) {
            createCellGenome(cell, newI, newJ, cellGenome.downGen, tree)
          }
        }
        if (cellGenome.leftGen <= 15) {
          newI = cell.i - 1
          newJ = cell.j
          if (isNextCellField(newI, newJ, fieldCells)) {
            createCellGenome(cell, newI, newJ, cellGenome.leftGen, tree)
          }
        }
        if (cellGenome.rightGen <= 15) {
          newI = cell.i + 1
          newJ = cell.j
          if (isNextCellField(newI, newJ, fieldCells)) {
            console.log('create genome');
            createCellGenome(cell, newI, newJ, cellGenome.rightGen, tree)
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
    console.log('moveCellDown')
    // console.log('i:', tree.i, 'j:', tree.j, 'Tree id:', tree.parentTree);
    // console.log('field move', tree.fieldCells[tree.j][tree.i]);
    if (tree.lastCell.j === tree.fieldCells.length - 1) {
      // console.log('At bottom');
      tree.lastCell.isCellFalling = false
      tree.lastCell.isFreeCellsAround = true
      realiseGenome(tree, fieldCells)
    } else {
      // const nextJ = tree.j + 1
      // console.log('need move');
      tree.positionCurrent = tree.lastCell
      tree.positionNext = tree.fieldCells[tree.positionCurrent.j + 1][tree.positionCurrent.i]
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
        tree.positionCurrent.setFieldType()
      }
    }
  }

  function createCellGenome(cell, newI, newJ, genomeToImplement, tree) {
    // console.log(`next i and j`, i, j);
    cell.setColor(tree.bodyColor)
    const nextCell = tree.fieldCells[newJ][newI]
    nextCell.setColor(tree.headColor)
    nextCell.setCellType()

    tree.counterCellAll = tree.counterCellAll + 1
    tree.counterCell = tree.counterCell + 1
    nextCell.indexInTree = tree.counterCellAll
    nextCell.genome = genomeToImplement
    nextCell.parentTree = tree
    tree.cells.push(nextCell)
    refreshLastCell(tree)
    createCellLog(tree)
  }

  function refreshLastCell(tree) {
    tree.lastCell = tree.cells[tree.cells.length - 1]
  }

  function createCellLog(tree) {
    // let logText = "Create cell column:" + tree.lastCell.i + ", raw:" + tree.lastCell.j +", TreeID: "+tree.id
    const logObject = {
      i: tree.lastCell.i,
      j: tree.lastCell.j,
      id: tree.id,
      type: 'create',
      headColor: tree.headColor,
      bodyColor: tree.bodyColor,
    }
    tree.logTextArray.push(logObject)
    if (tree.logTextArray.length > 50) {
      tree.logTextArray.shift()
    }
  }

  function refreshEnergy(tree, digitalTrees) {
    console.log('refreshEnergy');
    // console.time('increaseEnergy')
    increaseEnergy(tree)
    // console.timeEnd('increaseEnergy')
    // console.time('reduceEnergy')
    reduceEnergy(tree)
    // console.timeEnd('reduceEnergy')
    // console.time('checkIsEnergyOver')
    checkIsEnergyOver(tree, digitalTrees)
    // console.timeEnd('checkIsEnergyOver')
  }

  function increaseEnergy(tree) {
    console.log('increaseEnergy');
    let generatedEnergyByCell = 0
    tree.cells.forEach(cell => {
      console.log('cell :>> ', cell);
      generatedEnergyByCell = generatedEnergyByCell + cell.generatedEnergyByCell()
    })
    tree.lastIncreaseEnergy = generatedEnergyByCell
    tree.energy = tree.energy + generatedEnergyByCell
  }

  function reduceEnergy(tree) {
    console.log('reduceEnergy');
    tree.lastReduceEnergy = tree.cells.length
    tree.energy = tree.energy - tree.cells.length
  }

  function checkIsEnergyOver(tree, digitalTrees) {
    console.log('checkIsEnergyOver');
    const isEnergyOver = tree.energy < 0
    if (isEnergyOver) {
      if (tree.cells.length <= 1) {
        console.log('1 cell');
        allCellToField(tree)
        deleteAllCells(tree)
      } else {
        console.log('more then 1 cell');
        deleteTreeBody(tree)
        createTreeFromHeadCell(tree)
        tree.cells = []
      }
      deleteEmptyTrees(digitalTrees)
    }
  }

  function allCellToField(tree) {
    tree.cells.forEach(cell => cell.setFieldType)
  }

  function deleteAllCells(tree) {
    tree.cells = []
    tree.lastCell = {}
  }

  function deleteTreeBody(tree) {
    // console.log('in delete body');

    tree.cells.forEach(cell => {
      if (cell.color === tree.bodyColor) {
        cell.setFieldType()
      }
    })
    tree.cells = tree.cells.filter(cell => cell.color === tree.headColor)

    tree.cells.forEach(cell => cell.cellFalling())

    tree.counterCell = 1
  }

  function createTreeFromHeadCell(tree) {
    tree.cells.forEach(cell => {
      const newTree = new treeObject(
        tree.digitalTrees,
        tree.fieldCells,
        tree.logTextArray,
        tree.genome,
        tree.headColor,
        tree.bodyColor,
      )
      addCellFromParent(cell, newTree)
      mutateGenome(newTree)
    })
  }

  function addCellFromParent(cell, newTree) {
    newTree.cells.push(cell)
    newTree.counterCell = 1
    newTree.counterCellAll = 1
    newTree.refreshLastCell()
    newTree.lastCell.color = newTree.headColor
    newTree.lastCell.genome = 0
    // maybe something wring here
    newTree.cells[0].parentTree = newTree
    newTree.lastCell.parentTree = newTree
    console.log('cell :>> ', cell.parentTree.id);
    console.log('newTree :>> ', newTree.id);
  }

  function deleteEmptyTrees(digitalTrees) {
    const treeIndex = digitalTrees.findIndex(tree => tree.cells.length === 0)
    if (treeIndex !== -1) {
      digitalTrees.splice(treeIndex, 1)
    }
  }

  function mutateGenome(tree) {
    const randomGenomRaw = tree.getRandomInt(0, GENOME_COUNT)
    const randomGenDirection = () => {
      const randomInt = tree.getRandomInt(0, 4)
      if (randomInt === 0) {
        tree.genome[randomGenomRaw].upGen = tree.getRandomInt(0, GENOME_MAX_VALUE)
      }
      if (randomInt === 1) {
        tree.genome[randomGenomRaw].downGen = tree.getRandomInt(0, GENOME_MAX_VALUE)
      }
      if (randomInt === 2) {
        tree.genome[randomGenomRaw].leftGen = tree.getRandomInt(0, GENOME_MAX_VALUE)
      }
      if (randomInt === 3) {
        tree.genome[randomGenomRaw].rightGen = tree.getRandomInt(0, GENOME_MAX_VALUE)
      }
    }
  }

  function changeRandomColor(tree) {
    tree.headColor = tree.generateRandomColor()
    tree.bodyColor = tree.generateRandomColor()
  }

  return {
    chooseAction,
    allCellToField,
    deleteAllCells,
    changeRandomColor,
  }
}

export default useTrees
