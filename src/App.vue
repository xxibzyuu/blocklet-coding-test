<template>
  <div id="app">
    <block></block>
  </div>
</template>

<script>
import block from '@/pages/block/index.vue'

export default {
  name: 'App',
  components: {
    block
  },
};
</script>

<style>
  @import '@/assets/common.css';
</style>
