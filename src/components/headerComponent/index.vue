<!--
 * @Description: 
 * @Author: yuanzeyu
 * @Date: 2023-10-30 17:14:56
 * @LastEditTime: 2023-10-31 18:16:00
-->
<template>
  <div class="header">
    <!-- <a-row> -->
    <!-- <a-col :span="10" :offset="6"> -->
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
          <a-button slot="enterButton" class="enter-btn">
            <a-icon type="search" />
          </a-button>
        </a-input-search>
      </transition>
      <!-- <a-icon type="bulb" :style="{ fontSize: '24px', color: '#000', margin: '0 10px' }" /> -->
      <a-icon v-if="!showSearch" type="search" :style="{ fontSize: '24px', color: '#000', marginRight: '10px' }" @click="toggleSearch" />
    </div>
    <button class="sign-btn"><a-icon type="user" /> Sign in</button>
  </div>
</template>

<script>
export default {
  name: 'headerComponent',
  props: ['isShow'],
  data() {
    return {
      showSearch: false,
      smallWidth: false,
      showBulb: false,
      searchName: ''
    };
  },
  watch: {
    isShow() {
      // this.showSearch = this.isShow;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  // methods: {
  //   handleResize() {
  //     this.showSearch = window.innerWidth >= 840;
  //   },
  // }
  methods: {
    handleResize() {
      if(window.innerWidth >= 840) {
        this.showSearch = true;
        this.smallWidth = false;
      } else {
        this.showSearch = false;
        this.smallWidth = true;
      }
      // this.showSearch = window.innerWidth >= 840;
      // this.smallWidth = window.innerWidth < 840
    },
    onSearch() {
      this.$emit('search', this.searchName)
    },
    toggleSearch() {
      this.showBulb = false;
      this.showSearch = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    hideSearch() {
      if(this.smallWidth) {
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
