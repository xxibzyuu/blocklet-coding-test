<!--
 * @Description: 
 * @Author: yuanzeyu
 * @Date: 2023-10-30 17:14:56
 * @LastEditTime: 2023-10-30 23:02:11
-->
<template>
  <div class="header">
    <a-row>
      <a-col :span="10" :offset="6">
        <!-- <div class="header-center"> -->
          <a-input-search class="header-search" placeholder="Search Blockchain, Transaction, Address and Blocks" @search="onSearch" >
            <a-button slot="enterButton" class="enter-btn">
              <a-icon type="search" />
            </a-button>
          </a-input-search>
          <a-icon type="bulb" :style="{fontSize: '24px', color: '#000'}" />
        <!-- </div> -->
      </a-col>
      <a-col :span="4" :offset="4">
        <button class="sign-btn"><a-icon type="user" /> Sign in</button>
      </a-col>
    </a-row>
    
  </div>
</template>

<script>
export default {
  name: 'headerComponent',
  data() {
    return {

    }
  },
  methods: {
    onSearch() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  /* display: flex; */
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgb(238, 238, 238);

  &-center {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 25%;
  }
  
  &-search {
    height: 40px;
    border-radius: 30px;

    .ant-input-group > .ant-input {
      height: 40px !important;
    }

    .enter-btn {
      width: 50px;
      height: 40px;
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .sign-btn {
    width: 120px;
    height: 40px;
    background: #000;
    color: #fff;
    border-radius: 40px;
    border: none;
  }
}
.ant-input:hover {
  border: none !important;
}
</style>