<template>
  <div
    :class="{
      block: true,
      create_block_animation: cellIsCreateAnimation,
      change_size_animation: cellIsCellAnimation
    }"
    :style="{background: cellColor}"
  >
    <p
      v-if="cellType==='cell'"
      :class="{cellText: true, }"
      :style="{color: cellColor}"
    >
      <!-- {{cellObject.id}} -->
      <!-- {{cellObject.id}} -->
      <!-- {{cellObject.parentTree.id}}-{{cellObject.indexInTree}} -->
      <!-- {{cellObject.j}}-{{cellObject.i}} id{{cellObject.parentTree.id}} -->

      <!-- {{cellObject.j}}-{{cellObject.i}} id:{{cellObject.parentTree.id}} -->
    </p>
  </div>
</template>

<script>

import { ref, computed } from 'vue'

export default {
  name: 'CellObject',
  props: {
    cellColor: {
      type: String,
      default: '#000000',
    },
    cellType: {
      type: String,
      default: '',
    },
    cellIsCreateAnimation: {
      type: Boolean,
      default: false,
    },
    cellIsCellAnimation: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const isField = ref('false')
    const isCell = ref('false')

    isField.value = computed(() => props.cellType === 'field')
    isCell.value = computed(() => props.cellType === 'cell')

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
