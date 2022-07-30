<template>
  <div>
    <div>
      <div
        class="block-counter__header"
      >
        <p
          class="block-counter__header-text"
          style="color: white"
        >
          Tree count:  {{ digitalTrees.length }}
        </p>
      </div>
    </div>
    <div
      v-for="(tree, index) in digitalTrees"
      :key="tree.id"
      class="cell-counter"
    >
      <div
        class="block-counter-head"
        :style="{background: tree.headColor}"
      >
        <p
          class="cellText"
          :style="{color: tree.headColor}"
        >
          {{ index }}
        </p>
      </div>
      <div
        class="block-counter"
        :style="{background: tree.bodyColor}"
      >
        <p
          class="cellText"
          :style="{color: tree.bodyColor}"
        >
          <!-- :style="{color: tree.color}" -->
          Energ:{{ tree.energy }}, Cells: {{ tree.cells.length }} +{{ tree.lastIncreaseEnergy }} / -{{ tree.lastReduceEnergy }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CellCounter',
  props: {
    digitalTrees: {
      type: Array,
      default: () => [],
    },
  },
}

</script>

<style scoped>
  @import 'cell-counter';
</style>

