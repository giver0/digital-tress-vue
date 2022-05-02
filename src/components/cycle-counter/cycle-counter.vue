<template>
  <div class="digital-tree__counter_cycle">
    <div>
      <div class="digital-tree__counter-title">
        All cycle
      </div>
      <div class="digital-tree__counter-count" id="counter-count">
        {{ cycleCounter }}
      </div>
    </div>
    <div>
      <div class="digital-tree__counter-title">
        Full cycle
      </div>
      <div class="digital-tree__counter-count" id="counter-fullCircle-count">
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
