<template>
  <div class="digital-tree__control-button">
    <img
      v-if="isGamePaused === false"
      src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-Pause-essential-collection-bearicons-glyph-bearicons.png"
      class="digital-tree__field-left-control-button"
      style="height:48px"
      id="field-left-control-pause"
      @click="pauseGame"
    />
    <img
      v-else
      src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-Play-essential-collection-bearicons-glyph-bearicons.png"
      class="digital-tree__field-left-control-button"
      style="height:48px"
      id="field-left-control-pause"
      @click="pauseGame"
    />
    <img
      src="https://img.icons8.com/glyph-neue/64/000000/restart.png"
      class="digital-tree__field-left-control-button"
      id="field-left-control-restart"
      style="height:56px"
      @click="restartPage"
    />
    <img
      src="@/assets/paint-palette-svgrepo-com.svg"
      class="digital-tree__field-left-control-button"
      id="field-left-control-color"
      :style="colorButtonStyle"
      @click="stopChangeColor"
    />
  </div>
</template>

<script>

import { ref } from 'vue'

export default ({
  name: 'ControlButton',
  props: {
    isGamePaused: {
      type: Boolean,
    },
    isCanChangeColor: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const colorButtonStyle = ref({})

    function restartPage() {
      location.reload()
    }

    function pauseGame() {
      emit('onPauseGame')
    }

    function stopChangeColor() {
      colorButtonStyle.value = props.isCanChangeColor === false
        ? { height: '40px' }
        : { filter: 'invert(0.6)', height: '40px' }
      emit('onChangeColor')
    }

    return {
      restartPage,
      pauseGame,
      colorButtonStyle,
      stopChangeColor,
    }
  },
})
</script>

<style>
  @import "control-button"
</style>
