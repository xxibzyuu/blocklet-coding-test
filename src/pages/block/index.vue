<!--
 * @Description: 
 * @Author: yuanzeyu
 * @Date: 2023-10-30 17:12:26
 * @LastEditTime: 2023-10-31 01:27:29
-->
<template>
  <div>
    <header-component></header-component>
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
          <span class="time-text">Mined on October 30, 2023 04:37:15</span>
          <button class="mine-btn">F2Pool</button>
          <div>
            <span class="msg-text">Coinbase Message</span>
            <span class=""> •</span>
            <span>,z>mm1Yc7<;UV$wYQ: ;Nw5QR/E-Mhp /F2Pool/fzkY</span>
          </div>
          <span class="desc-text">A total of 4,813.14 BTC ($164,787,971) were sent in the block with the average transaction being 1.5895 BTC ($54,419.90). F2Pool earned a total reward of 6.25 BTC $213,982. The reward consisted of a base reward of 6.25 BTC $213,982 with an additional 0.1235 BTC ($4,228.28) reward paid as fees of the 3,028 transactions which were included in the block.</span>
        </div>
      </div>

      <div class="block-item">
        <h3>details</h3>
        <div class="detail-list">
          <div class="detail-item" v-for="item in BLOCK_DETAIL_COLUMNS" :key="item.key">
            <span class="detail-label">{{ item.title }}</span>
            <span class="detail-value">{{ detailInfo[item.dataIndex] }}</span>
            <a-icon type="copy" v-if="item.copyable" />
          </div>
          <!-- <a-descriptions title="details" :column="2">
            <a-descriptions-item v-for="(item, index) in BLOCK_DETAIL_COLUMNS" :key="item.key" :label="item.title">
              {{ detailInfo[item.dataIndex] }}
            </a-descriptions-item>
          </a-descriptions> -->
        </div>
      </div>
      <div class="block-item">
        <h3>Transactions</h3>
        <div>
          <a-collapse expandIconPosition="right" :bordered="false">
            <a-collapse-panel :key="index" v-for="(item, index) in tx">
              <div slot="header" class="gd-flex-center">
                <div>
                  <p>{{ index }} ID:{{ handleHash(item.hash) }}<a-icon type="copy" /></p>
                  <p>{{ handleTime(item.time) }}</p>
                </div>
                <div class="">
                  <p>FROM {{ fromInputs(item.inputs) }}<a-icon type="copy" v-if="item.inputs.length > 1" /></p>
                  <p>TO {{ toOutputs(item.out) }}<a-icon type="copy" v-if="item.inputs.length > 1" /></p>
                </div>
                <div></div>
              </div>
              <div>
                <div>
                  <h3>FROM</h3>
                </div>
                <a-divider type="vertical" />
                <div>
                  <h3>TO</h3>
                </div>
              </div>
            </a-collapse-panel>
          </a-collapse>
          <a-pagination size="small" :total="pageTotal" :pageSize="15" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { omit, get,  } from 'lodash'
import moment from 'moment'
import headerComponent from '@/components/header/index.vue'
import { BLOCK_DETAIL_COLUMNS } from '@/static/column'
export default {
  name: 'block',
  components: { headerComponent },
  data() {
    return {
      BLOCK_DETAIL_COLUMNS,
      detailInfo: {},
      pageTotal: 0
    }
  },
  mounted() {
    this.getDetail(0)
  },
  methods: {
    getDetail() {
      this.$axios.get('https://blockchain.info/rawblock/00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa').then(res => {
        console.log(res)
        this.detailInfo = omit(res.data, 'tx');
        this.tx = res.data.tx;
        this.pageTotal = this.tx.length;
      })
    },
    fromInputs(data) {
      if(data.length > 1) {
        return `${data.length} Inputs`;
      }else if(data.length == 1) {
        return this.handleHash(get(data[0], 'script'));
      }else {
        return '--';
      }
    },
    toOutputs(data) {
      if(data.length > 1) {
        return `${data.length} Outputs`;
      }else if(data.length == 1) {
        return this.handleHash(get(data[0], 'script'));
      }else {
        return '--';
      }
    },
    handleHash(data) {
      const start = data.substring(0, 4);
      const end = data.substring(data.length - 4, data.length);
      return `${start}-${end}`;
    },
    handleTime(time) {
      return moment(time).format('MM/DD YYYY hh:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';
.block-item {
  padding: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
}
.time-text {
  @include custom-text(12px, #ccc)
}
.msg-text {
  font-weight: bold;
  @include custom-text(14px, #000);
}
.desc-text {
  @include custom-text(14px, #ccc);
}
.mine-btn {
  width: 120px;
  background-color: rgba(237, 155, 96, 0.15);
  color: rgb(237, 155, 96);
  border: none;
}

.detail-list {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 2;
}
.detail-item {
  display: flex;
  width: 48%;
  margin-right: 10px;

  &:nth-child(2n) {
    margin-right: 0;
  }
}
.detail-label {
  width: 48%;
}
.detail-value {
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(153, 153, 153);
  font-family: "Inter var", sans-serif;
}
</style>