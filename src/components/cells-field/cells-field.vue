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
          :cell-color="cell.color"
          :cell-type="cell.type"
          :cell-parent-tree-id="cell?.parentTree?.id"
          :cell-is-create-animation="cell?.isCreateAnimation"
          :cell-is-cell-animation="cell?.isCellAnimation"
          :choosen-tree-id="choosenTreeId"
          @click="$emit('clicked', cell.i, cell.j)"
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
      default: () => [],
    },
    choosenTreeId: {
      type: String,
      default: 'none',
    },
  },
}
</script>

<style scoped>
 @import 'cells-field'
</style>
