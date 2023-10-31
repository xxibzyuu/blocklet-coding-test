<template>
  <div id="app">
    <block-info></block-info>
  </div>
</template>

<script>
import blockInfo from '@/pages/block-info/index.vue';

export default {
  name: 'App',
  components: {
    blockInfo,
  },
};
</script>

<style>
@import '@/assets/reset.css';
@import '@/assets/common.css';
</style>
