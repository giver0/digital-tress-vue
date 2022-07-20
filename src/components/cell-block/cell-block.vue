<template>
  <div :class="{
         block: true,
         create_block_animation: cellObject.isCreateAnimation,
         change_size_animation: cellObject.isCellAnimation
       }"
       :style="{background: cellObject.color}"
  >
    <p
      v-if="cellObject.type==='cell'"
      :class="{cellText: true, }"
      :style="{color: cellObject.color}"
    >
      <!-- {{cellObject.id}} -->
      <!-- {{cellObject.id}} -->
      <!-- {{cellObject.parentTree.id}}-{{cellObject.indexInTree}} -->
      <!-- {{cellObject.j}}-{{cellObject.i}} id{{cellObject.parentTree.id}} -->
      {{cellObject.genome}} id{{cellObject.parentTree.id}}

    </p>
  </div>
</template>

<script>

import { ref, computed } from 'vue'

export default {
  name: 'CellObject',
  props: {
    cellObject: {
      type: Object,
    },
  },

  setup(props) {
    const isField = ref('false')
    const isCell = ref('false')

    isField.value = computed(() => props.cellObject.type === 'field')
    isCell.value = computed(() => props.cellObject.type === 'cell')

    return {
      isField,
      isCell,
    }
  },
}

</script>

<style scoped>
  @import 'cell-block';
</style>
