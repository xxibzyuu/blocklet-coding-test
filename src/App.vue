<!--
 * @Description: 
 * @Author: yuanzeyu
 * @Date: 2023-10-31 13:44:35
 * @LastEditTime: 2023-11-01 18:23:55
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
@import '@/assets/common.scss';
</style>
