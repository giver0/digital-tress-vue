<template>
  <div>
    <CellHeader />
    <div class="digital-tree__layout">
      <div>
        <CellsField
          :fieldCells="fieldCells"
        />

      </div>
      <div class="digital-tree__control">
        <ControlButton
          @onPauseGame = "pauseGame"
          :isGamePaused = "isGamePaused"
          :isCanChangeColor = "isCanChangeColor"
          @onChangeColor = "ChangeColor"
        />
        <div class="digital-tree__counter">
          <CycleCounter
            :cycleCounter="cycleCounter"
            :fullCycleCounter="fullCycleCounter"
          />
          <div class="digital-tree__counter-box">
            <div class="digital-tree__counter-text">Delay (ms) </div>
            <input
              type="number"
              id="counter-speed"
              v-model="timeRange"
              placeholder="Speed"
              name="quantity"
              step="10"
              min="0"
              max="6000"
              class="counter-text-input"
            >
          </div>
          <div class="digital-tree__counter-box">
            <div class="digital-tree__counter-text" >Tree count</div>
            <input
              type="number"
              id="counter-tree"
              v-model="treeCount"
              placeholder="Tree count"
              name="quantity"
              step="1"
              min="0"
              max="10"
              class="counter-text-input"
            >
          </div>
          <div class="digital-tree__counter-box">
            <div class="digital-tree__counter-text">Column</div>
            <input
              type="number"
              id="counter-tree"
              v-model="fieldWidth"
              placeholder="Tree count"
              name="quantity"
              step="1"
              min="1"
              max="20"
              class="counter-text-input"
            >
          </div>
          <div class="digital-tree__counter-box">
            <div class="digital-tree__counter-text">Raw</div>
            <input
              type="number"
              id="counter-field-size-raw"
              v-model="fieldHeight"
              placeholder="Tree count"
              name="quantity"
              step="1"
              min="1"
              max="20"
              class="counter-text-input"
            >
          </div>
        </div>
        <div class="digital-tree__counter-trees-cell-boxs" id="counter-trees-cell">
          <CellCounter
            v-for="tree in digitalTrees" :key="tree.id"
            :tree="tree"
          />
        </div>
        <LogBox
          :logBoxArray = "logTextArray"
        />
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
    const fieldWidth = ref(16)
    const fieldHeight = ref(8)
    const digitalTrees = ref([])
    const treeCount = ref(3)
    const fieldCells = ref(new Array(8).fill(0)
      .map(() => new Array(16)))
    const blockClass = ref('block')
    const basicColor = ref('#808080')

    const timeRange = ref(200)

    const cycleCounter = ref(0)
    const fullCycleCounter = ref(0)

    const isGameStop = ref(false)
    const isGamePaused = ref(false)
    const isGamePausedAtMoment = ref(false)
    const isCanChangeColor = ref(true)

    const isAnyTreesCanMove = computed(() => {
      const isFreeCellsArray = digitalTrees.value
        .map(Tree => Tree.isFreeCellsAround)
      const isCanMove = isFreeCellsArray.includes(true)
      return isCanMove
    })

    console.log('Hi')
    createFieldObject()
    for (let treeCounter = 0; treeCounter < treeCount.value; treeCounter++) {
      new treeObject(digitalTrees.value)
    }

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
            blockClass.value,
            basicColor.value,
          )
        }
      }
    }

    function configBeforeStart() {
      console.log('In config')
      addFirstCellTrees()
    }

    function addFirstCellTrees() {
      for (const tree of digitalTrees.value) {
        tree.addFirstCell(
          fieldCells.value,
          basicColor.value,
          logTextArray.value,
        )
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
        await sleep(timeRange.value)
        // console.log('======= new turn =======')
        createCellAtAllTree()
        cycleCounter.value += 1
        if (isGamePaused.value) {
          isGamePausedAtMoment.value = true
          return
        }
      }
      fullCycleCounter.value += 1
      logNewFullCycle()
    }

    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms)
      })
    }

    async function createCellAtAllTree() {
      for (const tree of digitalTrees.value) {
        if (tree.isFreeCellsAround) {
          await tree.createCell(
            basicColor.value,
            fieldCells.value,
            logTextArray.value,
          )
        }
        // this.$forceUpdate()
      }
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
          cell.setFieldType(basicColor.value)
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

    watch(() => treeCount.value, async (current, previous) => {
      isGamePaused.value = true
      current > previous ? await addTree() : await deleteTree()
    })

    async function addTree() {
      while (isGamePausedAtMoment.value === true) {
        await sleep(200)
      }
      console.log('Added tree')
      new treeObject(digitalTrees.value)
      digitalTrees.value[digitalTrees.value.length - 1].addFirstCell(
        fieldCells.value,
        basicColor.value,
        logTextArray.value,
      )
      await pauseGame()
    }

    async function deleteTree() {
      while (isGamePausedAtMoment.value === true) {
        await sleep(200)
      }
      for (const cell of digitalTrees.value[digitalTrees.value.length - 1].cells) {
        cell.setFieldType(basicColor.value)
        await sleep(100)
      }
      digitalTrees.value.pop()
      await pauseGame()
    }

    watch(() => fieldWidth.value, (current, previous) => {
      current > previous ? addColumn() : deleteColumn()
    })

    function addColumn() {
      for (let j = 0; j < fieldCells.value.length; j++) {
        fieldCells.value[j].push(
          new cellObject(
            fieldCells.value[j].length,
            j,
            blockClass.value,
            basicColor.value,
          ),
        )
      }
    }

    function deleteColumn() {
      for (let j = 0; j < fieldCells.value.length; j++) {
        fieldCells.value[j].pop()
      }
    }

    watch(() => fieldHeight.value, (current, previous) => {
      current > previous ? addRow() : deleteRow()
    })

    function addRow() {
      fieldCells.value.push([])
      for (let i = 0; i < fieldCells.value[0].length; i++) {
        fieldCells.value[fieldCells.value.length - 1].push(
          new cellObject(
            i,
            fieldCells.value.length - 1,
            blockClass.value,
            basicColor.value,
          ),
        )
      }
    }

    function deleteRow() {
      fieldCells.value.pop()
    }

    return {
      treeCount,
      timeRange,
      fieldWidth,
      fieldCells,
      fieldHeight,
      logTextArray,
      cycleCounter,
      digitalTrees,
      isGamePaused,
      isCanChangeColor,
      fullCycleCounter,
      pauseGame,
      ChangeColor,
    }
  },
}
export default filedBox
</script>

<style>
  @import "field-box"
</style>
