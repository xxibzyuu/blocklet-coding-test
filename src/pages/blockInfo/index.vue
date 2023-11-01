<!--
 * @Description: block页
 * @Author: yuanzeyu
 * @Date: 2023-10-30 17:12:26
 * @LastEditTime: 2023-11-01 20:35:46
-->
<template>
  <div class="container">
    <header-component @search="getSearch" :loading="spinning"></header-component>
    <a-spin :spinning="spinning" size="large"></a-spin>
    <div v-if="spinning" class="empty-item">
      <h1>We are looking for...</h1>
    </div>
    <div v-if="!spinning && detailInfo == null" class="empty-item">
      <h1>We couldn't find what you are looking for...</h1>
    </div>
    <div v-if="!spinning && detailInfo">
      <div class="block-item gd-flex-c">
        <div class="top-item">
          <div class="image-item"></div>
          <div class="next-btn" @click="toNext">
            <a-icon type="right-circle" :style="{ fontSize: '30px', color: 'black' }"></a-icon>
          </div>
        </div>
        <div class="gd-flex-c">
          <div class="mine-name-item">
            <h1>Bitcoin Block</h1>
            <h2>{{ detailInfo.block_index }}</h2>
          </div>
          <div class="mine-item">
            <span class="time-text">Mined on {{ detailInfo.minedTime }}</span>
            <span class="dot"></span>
            <a class="hash-text">All Blocks</a>
          </div>
          <button class="mine-btn">F2Pool</button>
          <div class="mine-item">
            <span class="msg-text">Coinbase Message</span>
            <span class="dot"></span>
            <span>{{ coinMsg }}</span>
          </div>
          <span class="grey-text"
            >A total of 4,813.14 BTC ($164,787,971) were sent in the block with the average transaction being 1.5895 BTC
            ($54,419.90). F2Pool earned a total reward of 6.25 BTC $213,982. The reward consisted of a base reward of
            6.25 BTC $213,982 with an additional 0.1235 BTC ($4,228.28) reward paid as fees of the 3,028 transactions
            which were included in the block.
          </span>
        </div>
      </div>

      <div class="block-item">
        <h3>Details</h3>
        <detail-component :isUpdate="isUpdate" :detailInfo="detailInfo"></detail-component>
      </div>
      <div class="block-item">
        <h3>Transactions</h3>
        <transaction-component :isUpdate="isUpdate" :list="tx"></transaction-component>
      </div>
    </div>
  </div>
</template>

<script>
import { omit, get } from 'lodash';
import { handleHash, copyValue, handleTime, handleNum, copyTextToClipboard } from '@/utils/utils';
import headerComponent from '@/components/headerComponent/index.vue';
import detailComponent from './detail.vue';
import transactionComponent from './transaction.vue';
import { BLOCK_DETAIL_COLUMNS } from '@/static/column';
export default {
  name: 'blockInfo',
  components: { headerComponent, detailComponent, transactionComponent },
  data() {
    return {
      BLOCK_DETAIL_COLUMNS,
      spinning: false, // 加载中效果
      detailInfo: {}, // 概况信息
      tx: [], // 交易列表
      transactionList: [], // 分页后的交易列表
      pageTotal: 0, // 列表总数
      pageSize: 15, //每页显示的条目数
      currentPage: 1, // 当前页数
      startIndex: 0, // 当前页的起始索引
      endIndex: 0, // 当前页的结束索引
      isUpdate: false, // 更新概览的数据
      coinMsg: ',z&gt;mm 1 Yc7&lt;UV $ wYQ: ;Nw5QR/E-Mh  p   /F2Pool/f zkY',
      rawBlock: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
    };
  },
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.tx.slice(startIndex, endIndex); // 分页后的数据
    },
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    get,
    handleHash,
    copyValue,
    handleTime,
    handleNum,
    copyTextToClipboard,
    getSearch(value) {
      this.getDetail(value);
    },
    toNext() {
      const nextBlock = get(this.detailInfo.next_block, '0');
      this.getDetail(nextBlock);
    },
    getDetail(rawBlock = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa') {
      this.spinning = true;
      this.isUpdate = false;
      this.$axios
        .get(`/rawblock/${rawBlock}`)
        .then((res) => {
          console.log(res);
          this.detailInfo = omit(res.data, 'tx');
          this.tx = res.data.tx;
          this.pageTotal = this.tx.length;
          this.spinning = false;
          this.$nextTick(() => {
            this.isUpdate = true;
            this.detailInfo.minedTime = handleTime(this.detailInfo.time, 'MMMM/DD/YYYY H:mm:ss');
            this.detailInfo.block_index = handleNum(this.detailInfo.block_index);
          });
        })
        .catch(() => {
          this.detailInfo = null;
          this.spinning = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';
.empty-item {
  margin: 15% auto;
  text-align: center;
}
.ant-spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.top-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.image-item {
  width: 100px;
  height: 100px;
  border-radius: 8%;
  background-image: linear-gradient(21deg, rgba(255, 188, 136, 0.8), rgba(255, 188, 136, 0.2) 10.71%),
    linear-gradient(249.20000000000002deg, rgba(255, 188, 136, 0.8), rgba(255, 255, 255, 0) 70.71%),
    linear-gradient(142.4deg, rgba(255, 159, 117, 0.8), rgba(255, 197, 149, 0.2) 70.71%),
    linear-gradient(37deg, rgba(255, 99, 122, 0.8), rgba(255, 188, 136, 0.2) 70.71%);
}
.mine-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.mine-name-item {
  display: flex;
  align-items: baseline;

  h1 {
    margin-right: 10px !important;
  }
}
.block-item {
  padding: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
  h3 {
    margin-bottom: 10px !important;
  }
}
</style>
