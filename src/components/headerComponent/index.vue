<!--
 * @Description: 顶部搜索框
 * @Author: yuanzeyu
 * @Date: 2023-10-30 17:14:56
 * @LastEditTime: 2023-11-01 18:26:02
-->
<template>
  <div class="header">
    <div :class="['search-container', { center: showSearch }]">
      <transition name="slide-fade">
        <a-input-search
          v-if="showSearch"
          ref="searchInput"
          v-model="searchName"
          class="header-search"
          placeholder="Search Blockchain, Transaction, Address and Blocks"
          @search="onSearch"
          @blur="hideSearch">
          <a-button slot="enterButton" class="enter-btn" icon="search" :loading="loading"> </a-button>
        </a-input-search>
      </transition>
      <a-icon
        v-if="!showSearch"
        type="search"
        :style="{ fontSize: '24px', color: '#000', marginRight: '10px' }"
        @click="toggleSearch" />
    </div>
    <!-- <button class="sign-btn"><a-icon type="user" /> Sign in</button> -->
  </div>
</template>

<script>
export default {
  name: 'headerComponent',
  props: ['loading'],
  data() {
    return {
      showSearch: false,
      smallWidth: false,
      showBulb: false,
      searchName: '',
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (window.innerWidth >= 840) {
        this.showSearch = true;
        this.smallWidth = false;
      } else {
        this.showSearch = false;
        this.smallWidth = true;
      }
    },
    onSearch() {
      this.$emit('search', this.searchName);
    },
    toggleSearch() {
      this.showBulb = false;
      this.showSearch = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    hideSearch() {
      if (this.smallWidth) {
        this.showSearch = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgb(238, 238, 238);

  &-search {
    width: 50%;
    height: 40px;
    border-radius: 30px;

    .ant-input {
      border-top-left-radius: 32px;
      border-bottom-left-radius: 32px;
    }
    .ant-btn {
      border-top-right-radius: 32px;
      border-bottom-right-radius: 32px;
    }
    .enter-btn {
      width: 50px;
      height: 40px;
      color: #000;
      font-size: 18px;
      background: rgb(238, 238, 238);
    }
    .enter-btn:hover {
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
.search-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.search-container.center {
  justify-content: center;
  margin-right: auto;
}
@media (max-width: 840px) {
  .search-container {
    justify-content: flex-end;
  }
}
</style>
