<template>
  <div
    :class="classOptions"
    :style="styleOptions"
    @click="sayHello"
  >
    <p
      v-if="cellType==='cell'"
      :class="{cellText: true, }"
      :style="{color: cellColor}"
    >
      <!-- {{cellObject.j}}-{{cellObject.i}} id:{{cellObject.parentTree.id}} -->
    </p>
  </div>
</template>

<script>

import { ref, computed, onMounted } from 'vue'

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
    cellParentTreeId: {
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
    choosenTreeId: {
      type: String,
      default: 'none',
    },
  },

  setup(props) {
    const isField = ref('false')
    const isCell = ref('false')
    const isCellChoosed = computed(() => props.cellParentTreeId === props.choosenTreeId)
    const classOptions = computed(() => {
      return {
        block: true,
        create_block_animation: props.cellIsCreateAnimation,
        change_size_animation: props.cellIsCellAnimation,
        'block--choosed': isCellChoosed.value,
      }
    })
    const styleOptions = computed(() => {
      return {
        background: props.cellColor,
      }
    })

    isField.value = computed(() => props.cellType === 'field')
    isCell.value = computed(() => props.cellType === 'cell')

    function sayHello() {
    }

    return {
      isCell,
      isField,
      classOptions,
      styleOptions,
      sayHello,
    }
  },
}

</script>

<style scoped>
  @import 'cell-block';
</style>
