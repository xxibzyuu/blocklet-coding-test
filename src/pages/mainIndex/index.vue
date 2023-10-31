<!--
 * @Description: 
 * @Author: yuanzeyu
 * @Date: 2023-10-31 17:44:23
 * @LastEditTime: 2023-10-31 18:06:20
-->
<template>
  <div>
    <header-component @search="getSearch"></header-component>
    <div v-if="searchValue">
      <h1>What can we help you find?</h1>
      <p>Use the search bar at the top of the page to explore the blockchain.</p>
    </div>
    <div v-if="searchValue">
      <h1>Oops! We couldn't find what you are looking for.</h1>
      <p>Please enter an address, transaction hash, block height or hash</p>
    </div>
    <block-info v-if="!searchValue"></block-info>
  </div>
</template>

<script>
import headerComponent from '@/components/headerComponent/index.vue';
import blockInfo from '@/pages/blockInfo/index.vue'
export default {
  name: 'mainIndex',
  components: {
    headerComponent,
    blockInfo
  },
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    getSearch(searchValue) {
      this.searchValue = searchValue
    }
  }
}
</script>