<!--
 * @Description: 交易列表
 * @Author: yuanzeyu
 * @Date: 2023-11-01 17:21:14
 * @LastEditTime: 2023-11-01 20:11:56
-->
<template>
  <div class="transac-list">
    <a-collapse expandIconPosition="right" :bordered="false">
      <a-collapse-panel :key="index" v-for="(item, index) in paginatedData">
        <div slot="header" class="block-item-header">
          <div class="item-logo">TX</div>
          <a-row class="item-content">
            <a-col :sm="24" :md="8" :lg="8">
              <div class="gd-flex-center">
                <h4 class="index-text">{{ index }}</h4>
                <span class="grey-text">ID：</span><span class="hash-text">{{ handleHash(item.hash) }}</span>
                <button :class="`copy-hash-btn`" @click.stop="copyTextToClipboard(item.hash)">
                  <a-icon type="copy" />
                </button>
              </div>
              <p class="grey-text">{{ handleTime(item.time) }}</p>
            </a-col>
            <a-col :sm="24" :md="8" :lg="8">
              <p>
                FROM
                <span :class="item.inputs.length <= 1 ? 'hash-text' : 'grey-text'">{{ fromInputs(item.inputs) }}</span>
                <span
                  class="copy-input-btn"
                  v-if="item.inputs.length == 1"
                  @click.stop="copyTextToClipboard(get(item.inputs, '0.script'))">
                  <a-icon type="copy" />
                </span>
              </p>
              <p>
                To
                <span :class="item.out.length <= 1 ? 'hash-text' : 'grey-text'">{{ toOutputs(item.out) }}</span>
                <span
                  class="copy-out-btn"
                  v-if="item.out.length == 1"
                  @click.stop="copyTextToClipboard(get(item.out, '0.script'))">
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
                        <span class="copy-btn" @click.stop="copyTextToClipboard(ytem.script)">
                          <a-icon type="copy" />
                        </span>
                      </p>
                      <p>
                        <span>{{ ytem.sequence }} BTC</span>
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
                    <span class="copy-btn" @click.stop="copyTextToClipboard(ztem.script)">
                      <a-icon type="copy" />
                    </span>
                  </p>
                  <p>
                    <span>{{ ztem.value }} BTC</span>
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
      class="custom-pagination"
      @change="handlePageChange" />
  </div>
</template>

<script>
import { get, isNumber, split, round, padEnd } from 'lodash';
import { handleHash, handleTime, copyTextToClipboard } from '@/utils/utils';
export default {
  name: 'block-transaction',
  props: ['list', 'isUpdate'],
  data() {
    return {
      transactionList: [], // 分页后的交易列表
      // pageTotal: 0,
      pageSize: 15, //每页显示的条目数
      currentPage: 1, // 当前页数
      startIndex: 0, // 当前页的起始索引
      endIndex: 0, // 当前页的结束索引
    };
  },
  computed: {
    // 列表总数
    pageTotal() {
      return this.list.length;
    },
    paginatedData() {
      if (this.isUpdate) {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const curList = this.list.slice(startIndex, endIndex);
        curList.forEach((item) => {
          item.inputs.forEach((input) => {
            input.sequence = this.formatNumber(input.sequence / 100000000, 8);
          });
          item.out.forEach((out) => {
            out.value = this.formatNumber(out.value / 100000000, 8);
          });
        });
        return curList; // 分页后的数据
      }
      return [];
    },
  },
  methods: {
    handleHash,
    handleTime,
    copyTextToClipboard,
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
    formatNumber(num, precision = 0) {
      if (isNumber(num)) {
        let [int, float] = split(`${round(num, precision)}`, '.');
        float = padEnd(float, precision, 0);
        // 这样处理不管如何, 都是保留precision位小数
        return `${int || 0}${float ? `.${float}` : ''}`;
      }
      return num;
    },
  },
};
</script>

<style lang="scss" scoped>
.block-item {
  padding: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
  h3 {
    margin-bottom: 10px !important;
  }
  &-header {
    display: flex;
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
      .ant-col-sm-24 {
        margin-bottom: 10px;
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
/* 分页的样式重置 */
.custom-pagination.ant-pagination.mini {
  text-align: center;
  margin: 30px 0;
}
.copy-hash-btn {
  border: 0;
  background: none;
}
</style>
