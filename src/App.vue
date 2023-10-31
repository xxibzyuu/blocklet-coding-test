<!--
 * @Description: 
 * @Author: yuanzeyu
 * @Date: 2023-10-31 13:44:35
 * @LastEditTime: 2023-10-31 18:14:24
-->
<template>
  <div id="app">
    <block-info></block-info>
  </div>
</template>

<script>
import blockInfo from '@/pages/blockInfo/index.vue';

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
