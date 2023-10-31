<!--
 * @Description: 
 * @Author: yuanzeyu
 * @Date: 2023-10-30 17:12:26
 * @LastEditTime: 2023-10-31 13:45:13
-->
<template>
  <div>
    <header-component :isShow="showSearch"></header-component>
    <div>
      <div class="block-item gd-flex-c">
        <div class="">
          <div></div>
          <image></image>
        </div>
        <div class="gd-flex-c">
          <div class="gd-flex-center">
            <h1>Bitcoin Block</h1>
            <h2>814,501</h2>
            <!-- <span class="name-text">Bitcoin Block</span>
            <span class="num-text">814,501</span> -->
          </div>
          <span class="time-text">Mined on {{ detailInfo.time }}</span>
          <button class="mine-btn">F2Pool</button>
        </div>
      </div>

      <div class="block-item">
        <h3>details</h3>
        <detail-component :detailInfo="detailInfo"></detail-component>
      </div>
      <div class="block-item">
        <h3>Transactions</h3>
        <div>
          <a-collapse expandIconPosition="right" :bordered="false">
            <a-collapse-panel :key="index" v-for="(item, index) in paginatedData">
              <div slot="header" class="block-item-header">
                <div class="item-logo">TX</div>
                <a-row class="item-content">
                  <a-col :span="8">
                    <div class="gd-flex-center">
                      <h4 class="index-text">{{ index }}</h4>
                      <span class="grey-text">ID:</span><span class="hash-text">{{ handleHash(item.hash) }}</span>
                      <span @click="copyValue(item.hash, $event)"><a-icon type="copy" /></span>
                    </div>
                    <p class="grey-text">{{ handleTime(item.time) }}</p>
                  </a-col>
                  <a-col :span="8">
                    <p>FROM {{ fromInputs(item.inputs) }}<a-icon type="copy" v-if="item.inputs.length > 1" /></p>
                    <p>TO {{ toOutputs(item.out) }}<a-icon type="copy" v-if="item.out.length > 1" /></p>
                  </a-col>
                  <a-col :span="8">
                    <p class="gd-flex-center">
                      <span>0.00130002 BTC</span>
                      <span class="dot"></span>
                      <span>$44.51</span>
                    </p>
                    <p class="gd-flex-center">
                      <span class="fee-text">Fee</span>
                      <span>15.4K Sats</span>
                      <span class="dot"></span>
                      <span>$5.29</span>
                    </p>
                  </a-col>
                </a-row>
                <!-- <div class="item-content">
                  <div class="gd-flex-center">
                    <h4 class="index-text">{{ index }}</h4>
                    <span class="grey-text">ID:</span><span class="hash-text">{{ handleHash(item.hash) }}</span>
                    <span @click="copyValue(item.hash, $event)"><a-icon type="copy" /></span>
                  </div>
                  <p class="grey-text">{{ handleTime(item.time) }}</p>
                </div>
                <div class="item-content">
                  <p>FROM {{ fromInputs(item.inputs) }}<a-icon type="copy" v-if="item.inputs.length > 1" /></p>
                  <p>TO {{ toOutputs(item.out) }}<a-icon type="copy" v-if="item.out.length > 1" /></p>
                </div>
                <div class="item-content">
                  <p class="gd-flex-center">
                    <span>0.00130002 BTC</span>
                    <span class="dot"></span>
                    <span>$44.51</span>
                  </p>
                  <p class="gd-flex-center">
                    <span class="fee-text">Fee</span>
                    <span>15.4K Sats</span>
                    <span class="dot"></span>
                    <span>$5.29</span>
                  </p>
                </div> -->
              </div>
              <div class="block-item-collapse">
                <a-row>
                  <a-col :span="11">
                    <h3>FROM</h3>
                    <div class="collapse-from">
                      <a-icon type="left-circle" theme="filled" />
                      <div class="script-item" v-for="(item, index) in item.inputs" :key="index">
                        <h4 class="index-text">{{ index + 1 }}</h4>
                        <div class="script-item-column">
                          <p class="gd-flex-center">
                            <span class="script">{{ item.script }}</span>
                            <span @click="copyValue(item.hash, $event)"><a-icon type="copy" /></span>
                          </p>
                          <p>
                            <span>0.03900400 BTC</span>
                            <span class="dot"></span>
                            <span>$1,335.38</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </a-col>
                  <a-col :span="11">
                    <h3>TO</h3>
                    <div class="script-item" v-for="(item, index) in item.out" :key="index">
                      <h4 class="index-text">{{ index + 1 }}</h4>
                      <div class="script-item-column">
                        <p class="gd-flex-center">
                          <span class="script">{{ item.script }}</span>
                          <span @click="copyValue(item.hash, $event)"><a-icon type="copy" /></span>
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
                <!-- <div class="collapse-script">
                  <h3>FROM</h3>
                  <a-icon></a-icon>
                  <div class="script-item" v-for="(item, index) in item.inputs" :key="index">
                    <h4 class="index-text">{{ index+1 }}</h4>
                    <div class="script-item-column">
                      <p class="gd-flex-center">
                        <span class="script">{{ item.script }}</span>
                        <span @click="copyValue(item.hash, $event)"><a-icon type="copy" /></span></p>
                      <p>BTC</p>
                    </div>
                  </div>
                </div>
                <a-divider type="vertical" class="divider" />
                <div class="collapse-script">
                  <h3>TO</h3>
                  <div class="script-item" v-for="(item, index) in item.out" :key="index">
                    <h4>{{ index+1 }}</h4>
                    <div class="script-item-column">
                      <p class="gd-flex-center">
                        <span class="script">{{ item.script }}</span>
                        <span @click="copyValue(item.hash, $event)"><a-icon type="copy" /></span></p>
                      <p>BTC</p>
                    </div>
                  </div>
                </div> -->
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
import { omit, get, mapKeys } from 'lodash';
import moment from 'moment';
import Clipboard from 'clipboard';
import { handleHash } from '@/utils/utils';
import headerComponent from '@/components/header/index.vue';
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
      showSearch: false,
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
    this.getDetail(0);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    getDetail() {
      this.$axios
        .get('https://blockchain.info/rawblock/00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa')
        .then((res) => {
          console.log(res);
          this.detailInfo = mapKeys(omit(res.data, 'tx'), (value, key) => {
            if (key == 'time') {
              this.detailInfo[key] = moment(this.detailInfo[key]).format('LLLL');
            }
          });
          this.tx = res.data.tx;
          this.pageTotal = this.tx.length;
        });
    },
    setCurrentList() {},

    handlePageChange(page) {
      this.currentPage = page;
    },
    handleItem(item) {
      switch (item.dataIndex) {
        case 'hash':
          return handleHash(this.detailInfo[item.dataIndex]);
        // break;

        default:
          return `--`;
      }
    },
    fromInputs(data) {
      if (data.length > 1) {
        return `${data.length} Inputs`;
      } else if (data.length == 1) {
        return handleHash(get(data[0], 'script'));
      } else {
        return '--';
      }
    },
    toOutputs(data) {
      if (data.length > 1) {
        return `${data.length} Outputs`;
      } else if (data.length == 1) {
        return handleHash(get(data[0], 'script'));
      } else {
        return '--';
      }
    },
    // handleHash(data) {
    //   if(data) {
    //     const start = data.substring(0, 4);
    //     const end = data.substring(data.length - 4, data.length);
    //     return `${start}-${end}`;
    //   }else {
    //     return '--'
    //   }
    // },
    handleTime(time) {
      return moment(time).format('MM/DD YYYY hh:mm:ss');
    },
    copyValue(value, event) {
      console.log(event);
      const clipboard = new Clipboard(event.target, {
        text: () => value,
      });

      clipboard.on('success', () => {
        console.log('复制成功');
        clipboard.destroy();
      });

      clipboard.on('error', () => {
        console.log('复制失败');
        clipboard.destroy();
      });

      clipboard.onClick(this.$el);
      // this.$clipBoard(value)
    },
    handleResize() {
      this.showSearch = window.innerWidth >= 840;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';
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
  width: 120px;
  background-color: rgba(237, 155, 96, 0.15);
  color: rgb(237, 155, 96);
  border: none;
}
</style>
