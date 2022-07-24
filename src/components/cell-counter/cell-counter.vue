<template>
  <div class="cell-counter">
    <div
      class="block-counter-head"
      :style="{background: headColor}"
    >
      <p
        class="cellText"
        :style="{color: headColor}"
      >
        {{ index }}
      </p>
    </div>
    <div
      class="block-counter"
      :style="{background: bodyColor}"
    >
      <p
        class="cellText"
        :style="{color: bodyColor}"
      >
        <!-- :style="{color: tree.color}" -->
        Energ:{{ energy }}, Cells: {{ cellLength }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CellCounter',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    headColor: {
      type: String,
      default: '',
    },
    bodyColor: {
      type: String,
      default: '',
    },
    energy: {
      type: Number,
      default: 0,
    },
    cellLength: {
      type: Number,
      default: 0,
    },
  },
}

</script>

<style scoped>
  @import 'cell-counter';
</style>

