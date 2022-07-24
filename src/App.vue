<template>
  <fieldBox />
</template>

<script>
import fieldBox from './components/field-box'

export default {
  name: 'App',
  components: {
    fieldBox,
  },
  methods: {
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  margin: 0px;
  padding: 0px;
}

@font-face {
  font-family: subwayTicker;
  src: url(@/fonts/SUBWT___.ttf);
}
</style>
