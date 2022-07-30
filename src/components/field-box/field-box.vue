<template>
  <div>
    <CellHeader />
    <div class="digital-tree__layout">
      <div class="digital-tree__main-layer">
        <CellsField
          :field-cells="fieldCells"
          :choosen-tree-id="displayCell?.parentTree?.id"
          @clicked="displayCellParam"
        />
        <div
          v-if="displayCell.parentTree?.id"
          class="tree-info"
        >
          <div class="tree-info__item">
            type - {{ displayCell.type }}
          </div>
          <div class="tree-info__item">
            i - {{ displayCell.i }}
          </div>
          <div class="tree-info__item">
            j - {{ displayCell.j }}
          </div>
          <div class="tree-info__item">
            id - {{ displayCell.id }}
          </div>
          <div class="tree-info__item">
            color - {{ displayCell.color }}
          </div>
          <div class="tree-info__item">
            isCellFalling - {{ displayCell.isCellFalling }}
          </div>
          <div class="tree-info__item">
            parentTree - {{ displayCell.parentTree?.id }}
          </div>
          <div class="tree-info__item">
            tree energy - {{ displayCell.parentTree?.energy }}
          </div>
          <div class="tree-info__item">
            tree cells - {{ displayCell.parentTree?.cells.length }}
          </div>
          <div class="tree-info__item">
            isFreeCellsAround - {{ displayCell.parentTree?.isFreeCellsAround }}
          </div>
          <div class="tree-info__item">
            {{ displayCell.parentTree?.genome }}
          </div>
        </div>
      </div>
      <div class="digital-tree__control">
        <ControlButton
          :is-game-paused="isGamePaused"
          :is-can-change-color="isCanChangeColor"
          @onPauseGame="pauseGame"
          @onChangeColor="ChangeColor"
        />
        <div class="digital-tree__counter">
          <CycleCounter
            :cycle-counter="cycleCounter"
            :full-cycle-counter="fullCycleCounter"
          />
          <div class="digital-tree__counter-box">
            <div class="digital-tree__counter-text">
              Delay (ms)
            </div>
            <img
              src="@/assets/close.svg"
              class="digital-tree__counter-default"
              @click="handleDelay"
            >
            <input
              id="counter-speed"
              v-model="timeRange"
              type="number"
              placeholder="Speed"
              name="quantity"
              step="10"
              min="0"
              max="6000"
              class="counter-text-input"
            >
          </div>
          <div class="digital-tree__counter-box">
            <div class="digital-tree__counter-text">
              Tree count
            </div>
            <input
              id="counter-tree"
              v-model="treeCount"
              type="number"
              placeholder="Tree count"
              name="quantity"
              step="1"
              min="0"
              max="10"
              class="counter-text-input"
            >
          </div>
          <div class="digital-tree__counter-box">
            <div class="digital-tree__counter-text">
              Column
            </div>
            <input
              id="counter-tree"
              v-model="fieldWidth"
              type="number"
              placeholder="Tree count"
              name="quantity"
              step="1"
              min="1"
              class="counter-text-input"
            >
          </div>
          <div class="digital-tree__counter-box">
            <div class="digital-tree__counter-text">
              Raw
            </div>
            <input
              id="counter-field-size-raw"
              v-model="fieldHeight"
              type="number"
              placeholder="Tree count"
              name="quantity"
              step="1"
              min="1"
              class="counter-text-input"
            >
          </div>
        </div>
        <div
          id="counter-trees-cell"
          class="digital-tree__counter-trees-cell-boxs"
        >
          <CellCounter
            :digital-trees="digitalTrees"
            @clicked="displayCellParam"
          />
        </div>
        <!-- <LogBox
          :logBoxArray = "logTextArray"
        /> -->
      </div>
    </div>
    <!-- <div>
      <FieldCenter />
    </div> -->
    <!-- <div >
      <div v-for="cellRaw in fieldCells" :key="cellRaw" class="testArray">
        <div v-for="cell in fieldRaw" :key="cell.id" >
          <CellBlock/>
        </div>
        <br>
      </div>
      Some text. Hello from WS
    </div> -->
  </div>
</template>

<script>

import cellObject from '../classes/cellObject'
import treeObject from '../classes/treeObject'
import ControlButton from '../control-button'
import CellHeader from '../cell-header'
import CellCounter from '../cell-counter'
import CellsField from '../cells-field'
import CycleCounter from '../cycle-counter'
import LogBox from '../log-box'
import { ref, onMounted, watch, computed } from 'vue'

const filedBox = {
  name: 'fieldBox',
  components: {
    ControlButton,
    CellHeader,
    CellCounter,
    CellsField,
    CycleCounter,
    LogBox,
  },
  setup() {
    const logTextArray = ref([])
    const fieldWidth = ref(30)
    const fieldHeight = ref(10)
    const digitalTrees = ref([])
    const treeCount = ref(5)
    const fieldCells = ref(new Array(fieldHeight.value).fill(0)
      .map(() => new Array(fieldWidth.value)))

    const timeRange = ref(300)

    const cycleCounter = ref(0)
    const fullCycleCounter = ref(0)

    const isGameStop = ref(false)
    const isGamePaused = ref(false)
    const isGamePausedAtMoment = ref(false)
    const isCanChangeColor = ref(true)
    const displayCell = ref({})

    // const isAnyTreesCanMove = computed(() => {
    //   const isFreeCellsArray = digitalTrees.value
    //     .map(Tree => Tree.isFreeCellsAround)
    //   const isCanMove = isFreeCellsArray.includes(true)
    //   return isCanMove
    // })
    const isAnyTreesCanMove = computed(() => {
      return true
    })

    const sortedDigitalTrees = computed(() => {
      if (digitalTrees.value.length < 1) {
        return digitalTrees.value
      }
      return digitalTrees.value.sort((a, b) => {
        return a.cells.length - b.cells.length
      })
    })

    watch(() => treeCount.value, async (current, previous) => {
      isGamePaused.value = true
      current > previous ? await addTree() : await deleteTree()
    })

    watch(() => fieldWidth.value, (current, previous) => {
      current > previous ? addColumn() : deleteColumn()
    })

    watch(() => fieldHeight.value, (current, previous) => {
      current > previous ? addRow() : deleteRow()
    })

    console.log('Hi here is start')
    createFieldObject()
    createFirstTrees()

    onMounted(() => {
      console.log('Hi Mounted')
      configBeforeStart()
      console.log('config before start finished')
      mainCycle()
    })

    function createFieldObject() {
      for (let j = 0; j < fieldCells.value.length; j++) {
        for (let i = 0; i < fieldCells.value[j].length; i++) {
          fieldCells.value[j][i] = new cellObject(
            i,
            j,
            fieldCells.value,
          )
        }
      }
    }

    function createFirstTrees() {
      for (let treeIndex = 0; treeIndex < treeCount.value; treeIndex++) {
        new treeObject(digitalTrees.value, fieldCells.value, logTextArray.value)
      }
    }

    function configBeforeStart() {
      console.log('In config')
      addFirstCellTrees()
    }

    function addFirstCellTrees() {
      for (const tree of digitalTrees.value) {
        tree.addFirstCell()
      }
    }

    async function mainCycle() {
      while (isGameStop.value === false) {
        if (isGamePaused.value === false) {
          await cycle()
        }
        if (isGamePaused.value === false) {
          restart()
        } else {
          await sleep(200)
        }
      }
    }

    async function cycle() {
      while (isAnyTreesCanMove.value) {
        console.time('startCycle')
        await sleep(timeRange.value)
        // console.log('======= new turn =======')
        chooseActionAtAllTree()
        deleteEmptyTrees()
        // console.log('tree in main cycle', digitalTrees.value)
        cycleCounter.value += 1
        if (isGamePaused.value) {
          isGamePausedAtMoment.value = true
          return
        }
        // console.log('digitalTrees.value.length :>> ', digitalTrees.value);
        console.timeEnd('startCycle')
      }
      fullCycleCounter.value += 1
      logNewFullCycle()
    }

    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms)
      })
    }

    async function chooseActionAtAllTree() {
      for (const tree of digitalTrees.value) {
        await tree.chooseAction()
        // this.$forceUpdate()
      }
    }

    function deleteEmptyTrees() {
      let badTreeCount = 0
      digitalTrees.value.forEach((tree, index) => {
        if (tree.cells.length === 0 || tree.energy < 0) {
          badTreeCount = badTreeCount + 1
          tree.allCellToField()
          tree.deleteAllCells()
          digitalTrees.value.splice(index, 1)
        }
      })
      fieldCells.value.forEach(
        raw => raw.forEach(
          cell => {
            if (cell?.parentTree !== null) {
              if (cell?.parentTree.energy < 0) {
                cell.setFieldType()
              }
            }
          },
        ),
      )
    }

    function logNewFullCycle() {
      logTextArray.value.push('========= New cycle =========')
    }

    function restart() {
      cleanField()
      console.log('CleanField')

      for (const tree of digitalTrees.value) {
        tree.reset()
      }

      if (isCanChangeColor.value) {
        changeTreesColor()
      }
      // logFieldCell()
      configBeforeStart()
      console.log('config')
    }

    function cleanField() {
      for (const raw of fieldCells.value) {
        for (const cell of raw) {
          cell.setFieldType()
        }
      }
    }

    function changeTreesColor() {
      for (const tree of digitalTrees.value) {
        tree.changeRandomColor()
      }
    }

    function pauseGame() {
      isGamePaused.value = !isGamePaused.value
      if (isGamePaused.value === false) {
        // this.mainCycle()
        isGamePausedAtMoment.value = false
      }
    }

    function ChangeColor() {
      isCanChangeColor.value = isCanChangeColor.value === true ? false : true
    }

    async function addTree() {
      while (isGamePausedAtMoment.value === true) {
        await sleep(200)
      }
      console.log('Added tree')
      new treeObject(digitalTrees.value, fieldCells.value, logTextArray.value)
      digitalTrees.value[digitalTrees.value.length - 1].addFirstCell()
      await pauseGame()
    }

    async function deleteTree() {
      while (isGamePausedAtMoment.value === true) {
        await sleep(200)
      }
      for (const cell of digitalTrees.value[digitalTrees.value.length - 1].cells) {
        cell.setFieldType()
        await sleep(100)
      }
      digitalTrees.value.pop()
      await pauseGame()
    }

    function addColumn() {
      for (let j = 0; j < fieldCells.value.length; j++) {
        fieldCells.value[j].push(
          new cellObject(
            fieldCells.value[j].length,
            j,
            fieldCells.value,
          ),
        )
      }
    }

    function deleteColumn() {
      for (let j = 0; j < fieldCells.value.length; j++) {
        fieldCells.value[j].pop()
      }
    }

    function addRow() {
      fieldCells.value.push([])
      for (let i = 0; i < fieldCells.value[0].length; i++) {
        fieldCells.value[fieldCells.value.length - 1].push(
          new cellObject(
            i,
            fieldCells.value.length - 1,
            fieldCells.value,
          ),
        )
      }
    }

    function deleteRow() {
      fieldCells.value.pop()
    }

    function displayCellParam(i, j) {
      console.log('display cell', i, j)
      console.log(`display cell`, i, ' ', j, fieldCells.value[j][i])
      displayCell.value = fieldCells.value[j][i]
      // displayCell.value = cell
    }

    function handleDelay() {
      timeRange.value = 0
    }

    return {
      treeCount,
      timeRange,
      fieldWidth,
      fieldCells,
      fieldHeight,
      displayCell,
      logTextArray,
      cycleCounter,
      digitalTrees,
      isGamePaused,
      isCanChangeColor,
      fullCycleCounter,
      sortedDigitalTrees,
      pauseGame,
      handleDelay,
      ChangeColor,
      displayCellParam,
    }
  },
}
export default filedBox
</script>

<style>
  @import "field-box"
</style>
