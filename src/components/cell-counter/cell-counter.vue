<template>
  <div class="cell-counter">
    <div
      class="block-counter-head"
      :style="{background: tree.headColor}"
    />
    <div
      class="block-counter"
      :style="{background: tree.bodyColor}"
    >
      <p
        class="cellText"
        :style="{color: tree.bodyColor}"
      >
        <!-- :style="{color: tree.color}" -->
        Energ:{{ tree.energy }}, Cells: {{ tree.cells.length }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CellCounter',
  props: {
    tree: {
      type: Object,
    },
  },
}

</script>

<style scoped>
  @import 'cell-counter';
</style>

