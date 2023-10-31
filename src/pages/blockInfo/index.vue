<!--
 * @Description: block页
 * @Author: yuanzeyu
 * @Date: 2023-10-30 17:12:26
 * @LastEditTime: 2023-10-31 22:52:04
-->
<template>
  <div>
    <header-component @search="getSearch"></header-component>
    <div>
      <div class="block-item gd-flex-c">
        <div class="top-item">
          <div class="image-item"></div>
          <div class="next-btn" @click="toNext">
            <a-icon type="right-circle" :style="{'fontSize': '30px', 'color': 'black'}"></a-icon>
          </div>
        </div>
        <div class="gd-flex-c">
          <div class="mine-item">
            <h1>Bitcoin Block</h1>
            <h2>{{ detailInfo.block_index }}</h2>
          </div>
          <div class="mine-item">
            <span class="time-text">Mined on {{ handleTime(detailInfo.time, 'MMMM/DD/YYYY H:mm:ss') }}</span>
            <span class="dot"></span>
            <a class="hash-text">All Blocks</a>
          </div>
          <button class="mine-btn">F2Pool</button>
          <div class="mine-item">
            <span class="msg-text">Coinbase Message</span>
            <span class="dot"></span>
            <span>{{ coinMsg }}</span>
          </div>
          <span class="grey-text">A total of 4,813.14 BTC ($164,787,971) were sent in the block with the average transaction being 1.5895 BTC ($54,419.90). F2Pool earned a total reward of 6.25 BTC $213,982. The reward consisted of a base reward of 6.25 BTC $213,982 with an additional 0.1235 BTC ($4,228.28) reward paid as fees of the 3,028 transactions which were included in the block.</span>
        </div>
      </div>

      <div class="block-item">
        <h3>details</h3>
        <detail-component :isUpdate="isUpdate" :detailInfo="detailInfo"></detail-component>
      </div>
      <div class="block-item">
        <h3>Transactions</h3>
        <div>
          <a-collapse expandIconPosition="right" :bordered="false">
            <a-collapse-panel :key="index" v-for="(item, index) in paginatedData">
              <div slot="header" class="block-item-header">
                <div class="item-logo">TX</div>
                <a-row class="item-content">
                  <a-col :sm="24" :md="8" :lg="8">
                    <div class="gd-flex-center">
                      <h4 class="index-text">{{ index }}</h4>
                      <span class="grey-text">ID：</span><span class="hash-text">{{ handleHash(item.hash) }}</span>
                      <span :class="`copy-btn${index}`" @click.stop="copyValue(`.copy-btn${index}`, 'hash', item)">
                        <a-icon type="copy" />
                      </span>
                    </div>
                    <p class="grey-text">{{ handleTime(item.time) }}</p>
                  </a-col>
                  <a-col :sm="24" :md="8" :lg="8">
                    <p>
                      FROM 
                      <span :class="item.inputs.length <= 1 ? 'hash-text' : 'grey-text'">{{ fromInputs(item.inputs) }}</span>
                      <span class="copy-input-btn" v-if="item.inputs.length == 1" @click.stop="copyValue(`.copy-input-btn`, 'script', item.inputs[0])">
                        <a-icon type="copy" />
                      </span>
                    </p>
                    <p>
                      To 
                      <span :class="item.out.length <= 1 ? 'hash-text' : 'grey-text'">{{ toOutputs(item.out) }}</span>
                      <span class="copy-out-btn" v-if="item.out.length == 1"  @click.stop="copyValue(`.copy-out-btn`, 'script', item.out[0])">
                        <a-icon type="copy" />
                      </span>
                    </p>
                  </a-col>
                  <a-col :sm="24" :md="8" :lg="8">
                    <p class="gd-flex-center">
                      <span>0.00130002 BTC</span>
                      <span class="dot"></span>
                      <span class="grey-text">$44.51</span>
                    </p>
                    <p class="gd-flex-center">
                      <span class="fee-text">Fee</span>
                      <span>15.4K Sats</span>
                      <span class="dot"></span>
                      <span class="grey-text">$5.29</span>
                    </p>
                  </a-col>
                </a-row>
              </div>
              <div class="block-item-collapse">
                <a-row>
                  <a-col :span="11">
                    <h3>FROM</h3>
                    <div class="collapse-from">
                      <a-icon type="left-circle" theme="filled" />
                      <div class="collapse-from-item">
                        <div class="script-item" v-for="(ytem, yndex) in item.inputs" :key="yndex">
                          <h4 class="index-text">{{ yndex + 1 }}</h4>
                          <div class="script-item-column">
                            <p class="gd-flex-center">
                              <span class="script">{{ ytem.script }}</span>
                              <span class="copy-btn" v-clipboard:copy.stop="ytem.script" v-clipboard:success="copySuccess" v-clipboard:error="copyError"><a-icon type="copy" /></span>
                            </p>
                            <p>
                              <span>0.03900400 BTC</span>
                              <span class="dot"></span>
                              <span>$1,335.38</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a-col>
                  <a-col :span="11">
                    <h3>To</h3>
                    <div class="script-item" v-for="(ztem, zndex) in item.out" :key="zndex">
                      <h4 class="index-text">{{ zndex + 1 }}</h4>
                      <div class="script-item-column">
                        <p class="gd-flex-center">
                          <span class="script">{{ ztem.script }}</span>
                          <span class="copy-btn" v-clipboard:copy.stop="ztem.script" v-clipboard:success="copySuccess" v-clipboard:error="copyError"><a-icon type="copy" /></span>
                        </p>
                        <p>
                          <span>0.03900400 BTC</span>
                          <span class="dot"></span>
                          <span>$1,335.38</span>
                        </p>
                      </div>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </a-collapse-panel>
          </a-collapse>
          <a-pagination
            size="small"
            :current="currentPage"
            :total="pageTotal"
            :pageSize="15"
            @change="handlePageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { omit, get } from 'lodash';
import moment from 'moment';
import VueClipboard from 'vue-clipboard2'
import { handleHash, copyValue, copySuccess, copyError } from '@/utils/utils';
import headerComponent from '@/components/headerComponent/index.vue';
import detailComponent from './detail.vue';
import { BLOCK_DETAIL_COLUMNS } from '@/static/column';
export default {
  name: 'blockInfo',
  components: { headerComponent, detailComponent },
  data() {
    return {
      BLOCK_DETAIL_COLUMNS,
      detailInfo: {},
      tx: [],
      transactionList: [], // 交易列表
      pageTotal: 0, // 列表总数
      pageSize: 15, //每页显示的条目数
      currentPage: 1, // 当前页数
      startIndex: 0, // 当前页的起始索引
      endIndex: 0, // 当前页的结束索引
      isUpdate: false,  // 更新概览的数据
      coinMsg: ',z&gt;mm 1 Yc7&lt;UV $ wYQ: ;Nw5QR/E-Mh  p   /F2Pool/f zkY',
      rawBlock: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa'
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
    copyText(value) {
      VueClipboard.copy(value)
      console.log(VueClipboard.success())
    },
    copySuccess(e) {
      copySuccess(e)
    },
    copyError(e) {
      copyError(e)
    },
    getSearch(value) {
      this.getDetail(value);
    },
    toNext() {
      const nextBlock = get(this.detailInfo.next_block, '0')
      this.getDetail(nextBlock)
    },
    getDetail(rawBlock = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa') {
      this.$NProgress.start()
      this.isUpdate = false
      this.$axios
        .get(`/rawblock/${rawBlock}`)
        .then((res) => {
          console.log(res);
          this.detailInfo = omit(res.data, 'tx')
          this.tx = res.data.tx;
          this.pageTotal = this.tx.length;
          this.$NProgress.done()
          this.$nextTick(() => {
            this.isUpdate = true
          })
        });
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.startIndex = (page - 1) * this.pageSize; // 计算新的起始索引
      this.endIndex = this.startIndex + this.pageSize; // 计算新的结束索引
    },
    fromInputs(data) {
      if (data.length > 1) {
        return `${data.length} Inputs`;
      } else if (data.length == 1) {
        return handleHash(get(data, '0.script', '--'));
      } else {
        return '--';
      }
    },
    toOutputs(data) {
      if (data.length > 1) {
        return `${data.length} Outputs`;
      } else if (data.length == 1) {
        return handleHash(get(data, '0.script', '--'));
      } else {
        return '--';
      }
    },
    handleTime(time, format = 'MM/DD/yyyy H:mm:ss') {
      const date = moment.unix(time);
      const formattedDate = date.format(format);
      return formattedDate;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';
.top-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image-item {
  width: 100px;
  height: 100px;
  border-radius: 8%;
  background-image: linear-gradient(21deg, rgba(255, 188, 136, 0.8), rgba(255, 188, 136, 0.2) 10.71%), linear-gradient(249.20000000000002deg, rgba(255, 188, 136, 0.8), rgba(255, 255, 255, 0) 70.71%), linear-gradient(142.4deg, rgba(255, 159, 117, 0.8), rgba(255, 197, 149, 0.2) 70.71%), linear-gradient(37deg, rgba(255, 99, 122, 0.8), rgba(255, 188, 136, 0.2) 70.71%);
}
.mine-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.block-item {
  padding: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);

  &-header {
    display: flex;
    /* justify-content: space-between; */

    .item-logo {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-right: 20px;
      border: 1px solid rgb(153, 153, 153);
      border-radius: 50%;
    }
    .item-content {
      flex: 1;

      
      .ant-col:last-child {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .ant-col-sm-24 {
        margin-bottom: 10px;
      }
      .ant-col.ant-col-sm-24:last-child {
        display: block;
      }
    }
  }

  &-collapse {
    .ant-row {
      display: flex;
      border-top: 1px solid rgb(238, 238, 238);

      .ant-col {
        padding: 10px 20px;
      }
      .ant-col:last-child {
        border-left: 1px solid rgb(238, 238, 238);
      }
    }
  }
}
.collapse-from {
  display: flex;

  &-item {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .anticon-left-circle {
    margin-top: 4px;
    margin-right: 10px;
  }
}
.collapse-script {
  width: 48%;

  .divider {
    height: auto;
  }
}
.script-item {
  display: flex;
  width: 100%;
  margin-bottom: 10px;

  &-column {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .script {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(237, 155, 96);
  }
  .index-text {
    margin-right: 10px !important;
  }
}
.index-text {
  margin-right: 4px !important;
}
.time-text {
  @include custom-text(12px, #ccc);
}
.msg-text {
  font-weight: bold;
  @include custom-text(14px, #000);
}
.hash-text {
  @include custom-text(14px, rgb(237, 155, 96));
}
.grey-text {
  @include custom-text(14px, rgb(153, 153, 153));
}
.fee-text {
  @include custom-text(14px, rgb(244, 91, 105));
}
.mine-btn {
  width: 90px;
  height: 30px;
  background-color: rgba(237, 155, 96, 0.15);
  color: rgb(237, 155, 96);
  border: none;
  border-radius: 30px;
  margin-bottom: 6px;
}

</style>
