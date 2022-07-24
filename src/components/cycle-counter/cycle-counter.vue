<template>
  <div class="digital-tree__counter_cycle">
    <div>
      <div class="digital-tree__counter-title">
        All cycle
      </div>
      <div
        id="counter-count"
        class="digital-tree__counter-count"
      >
        {{ cycleCounter }}
      </div>
    </div>
    <div>
      <div class="digital-tree__counter-title">
        Full cycle
      </div>
      <div
        id="counter-fullCircle-count"
        class="digital-tree__counter-count"
      >
        {{ fullCycleCounter }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CycleCounter',
  props: {
    cycleCounter: {
      type: Number,
    },
    fullCycleCounter: {
      type: Number,
    },
  },
}
</script>

<style scoped>
  @import 'cycle-counter'
</style>
