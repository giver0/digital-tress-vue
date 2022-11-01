import {
  TYPE_FIELD,
  BASIC_COLOR,
  GENOME_COUNT,
  GENOME_MAX_VALUE,
} from '@/constant/basic'

export const useTrees = () => {
  function chooseAction(tree) {
    if (tree.lastCell.isCellFalling) {
      // console.time('moveCellDown')
      moveCellDown(tree)
      // console.timeEnd('moveCellDown')
    } else {
      // console.time('realiseGenome')
      realiseGenome(tree)
      // tree.createCell()
      // console.timeEnd('realiseGenome')
    }
    // console.time('refreshEnergy')
    tree.refreshEnergy()
    // console.timeEnd('refreshEnergy')
  }

  function realiseGenome(tree) {
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
          if (tree.isNextCellField(newI, newJ)) {
            tree.createCellGenome(cell, newI, newJ, cellGenome.upGen)
          }
        }
        if (cellGenome.downGen <= 15) {
          newI = cell.i
          newJ = cell.j + 1
          if (tree.isNextCellField(newI, newJ)) {
            tree.createCellGenome(cell, newI, newJ, cellGenome.downGen)
          }
        }
        if (cellGenome.leftGen <= 15) {
          newI = cell.i - 1
          newJ = cell.j
          if (tree.isNextCellField(newI, newJ)) {
            tree.createCellGenome(cell, newI, newJ, cellGenome.leftGen)
          }
        }
        if (cellGenome.rightGen <= 15) {
          newI = cell.i + 1
          newJ = cell.j
          if (tree.isNextCellField(newI, newJ)) {
            tree.createCellGenome(cell, newI, newJ, cellGenome.rightGen)
          }
        }
      }
    })
  }

  function moveCellDown(tree) {
    // console.log('i:', tree.i, 'j:', tree.j, 'Tree id:', tree.parentTree);
    // console.log('field move', tree.fieldCells[tree.j][tree.i]);
    if (tree.lastCell.j === tree.fieldCells.length - 1) {
      // console.log('At bottom');
      tree.lastCell.isCellFalling = false
      tree.lastCell.isFreeCellsAround = true
      realiseGenome(tree)
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

  return {
    chooseAction,
  }
}

export default useTrees
