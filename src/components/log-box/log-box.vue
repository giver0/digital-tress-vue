<template>
  <div class="digital-tree__log-box">
    <!-- <div class="digital-tree__field-left-title">
      Logbox
    </div> -->
    <div
      class="digital-tree__logbox-title digital-tree__log-box-border"
      style="border-style: solid"
    >
      <div
        class="digital-tree__field-left-logbox-text"
        style="border: none"
      >
        <div
          class="digital-tree__field-left-logbox-td"
          style="width: 56px; margin-left: 0px;"
        >
          Action
        </div>
        <div
          class="digital-tree__field-left-logbox-td"
          style="width: 48px"
        >
          Tree
        </div>
        <div
          class="digital-tree__field-left-logbox-td"
          style="width: 48px"
        >
          Raw
        </div>
        <div
          class="digital-tree__field-left-logbox-td"
          style="width: 48px"
        >
          Col.
        </div>
      </div>
    </div>
    <div
      id="logbox"
      class="digital-tree__field-left-logbox "
    >
      <div
        v-for="(log, index) in logBoxArray.slice().reverse()"
        :key="index"
        class="digital-tree__field-left-logbox-text digital-tree__log-box-border"
      >
        <tr>
          <td
            class="digital-tree__field-left-logbox-td"
            :style="{color: log.bodyColor, width: 64+'px'}"
          >
            Create
          </td>
          <td
            class="digital-tree__field-left-logbox-td"
            :style="{color: log.bodyColor, width: 48+'px'}"
          >
            {{ log.id }}
          </td>
          <td
            class="digital-tree__field-left-logbox-td"
            :style="{color: log.bodyColor, width: 48+'px'}"
          >
            {{ log.i }}
          </td>
          <td
            class="digital-tree__field-left-logbox-td"
            :style="{color: log.bodyColor, width: 48+'px'}"
          >
            {{ log.j }}
          </td>
        </tr>
        <!-- {{log}} -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LogBox',
  props: {
    logBoxArray: {
      type: Array,
      default: () => [],
      scrollToBottom() {
        console.log('Hello')
      },
    },
  },
  // maby add this function in future bue need setup()
  // function scrollToBottom() {
  //   const container = this.$refs.logbox;
  //   container.scrollTop = container.scrollHeight;
  // }

}
</script>

<style scoped>
  @import 'log-box'
</style>
