import {
  TYPE_FIELD,
  BASIC_COLOR,
  GENOME_COUNT,
  GENOME_MAX_VALUE,
} from '@/constant/basic'

export const useTrees = () => {
  function chooseAction(tree, fieldCells) {
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
    tree.refreshEnergy()
    // console.timeEnd('refreshEnergy')
  }

  function realiseGenome(tree, fieldCells) {
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
    tree.refreshLastCell()
    tree.createCellLog()
  }

  return {
    chooseAction,
  }
}

export default useTrees
