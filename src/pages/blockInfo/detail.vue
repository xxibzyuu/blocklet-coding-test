<!--
 * @Description: block概要
 * @Author: yuanzeyu
 * @Date: 2023-10-31 08:44:17
 * @LastEditTime: 2023-10-31 18:48:20
-->
<template>
  <div class="detail-list">
    <div class="detail-item" v-for="item in BLOCK_DETAIL_COLUMNS" :key="item.key">
      <span class="detail-label">{{ item.title }}</span>
      <!-- <span v-if="item.custom" class="detail-value">{{ item.render(item.dataIndex) }}</span>
      <span v-else class="detail-value">{{ detailInfo[item.dataIndex] || '--' }}</span> -->
      <span class="detail-value">
        {{ renderValue(item) }}
        <span v-if="item.copyable" class="copy-btn" ref="copys" @click="$nextTick(() => {copyValue('.copy-btn', item.key, detailInfo)})"><a-icon type="copy"/></span>
      </span>
      
    </div>
  </div>
</template>

<script>
import { BLOCK_DETAIL_COLUMNS } from '@/static/column';
import { copyValue, updateDuration } from '@/utils/utils'
import moment from 'moment';

export default {
  name: 'blockDetail',
  props: ['isUpdate', 'detailInfo'],
  data() {
    return {
      BLOCK_DETAIL_COLUMNS,
      currentDetail: {},
      duration: ''
    };
  },
  mounted() {
    this.currentDetail = this.detailInfo;
    setInterval(() => {
      this.updateDuration();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval()
  },
  methods: {
    copyValue,
    renderValue(item) {
      if(this.isUpdate) {
        const key = item.key;
        const customRender = item.render;
  
        if (this.detailInfo.hasOwnProperty(key)) {
          let value = this.detailInfo[key];
  
          if (customRender && typeof customRender === 'function') {
            return customRender(key, value);
          }
          if(key == 'time') {
            this.duration = updateDuration(this.detailInfo.time)
            return this.duration
          }
  
          return value;
        }
        return '--';
      }
      return '';
    },
    updateDuration() {
      let duration = moment.duration(this.duration);
      duration.add(1, 'second');
      const currentDuration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
      this.duration = currentDuration
      this.currentDetail['time'] = currentDuration
    },
  },
};
</script>

<style lang="scss" scoped>
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
  font-family: 'Inter var', sans-serif;
}
</style>
