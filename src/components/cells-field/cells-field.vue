<template>
  <div class="blocks-field">
    <div
      v-for="(cellRaw, index) in fieldCells"
      :key="index"
      class="testArray"
    >
      <div
        v-for="cell in cellRaw"
        :key="cell.id"
        class="testArray"
      >
        <CellBlock
          :cellObject="cell"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CellBlock from '../cell-block'

export default {
  name: 'CellsField',
  components: {
    CellBlock,
  },
  props: {
    fieldCells: {
      type: Array,
    },
  },
}
</script>

<style scoped>
 @import 'cells-field'
</style>
