<!--
 * @Description: block概要
 * @Author: yuanzeyu
 * @Date: 2023-10-31 08:44:17
 * @LastEditTime: 2023-11-01 17:27:39
-->
<template>
  <div class="detail-list">
    <div class="detail-item" v-for="item in BLOCK_DETAIL_COLUMNS" :key="item.key">
      <span class="detail-label">{{ item.title }}</span>
      <span class="detail-value">
        <a-tooltip v-if="item.copyable">
          <template slot="title">
            {{ detailInfo[item.key] }}
          </template>
          {{ renderValue(item) }}
        </a-tooltip>
        <span v-else>{{ renderValue(item) }}</span>
        <span v-if="item.copyable" class="copy-btn" ref="copys" @click.stop="copyTextToClipboard(detailInfo[item.key])"
          ><a-icon type="copy" :style="{ fontSize: '12px' }"
        /></span>
      </span>
    </div>
  </div>
</template>

<script>
import { BLOCK_DETAIL_COLUMNS } from '@/static/column';
import { updateDuration, copyTextToClipboard } from '@/utils/utils';
import moment from 'moment';
import { has } from 'lodash';

export default {
  name: 'blockDetail',
  props: ['isUpdate', 'detailInfo'],
  data() {
    return {
      BLOCK_DETAIL_COLUMNS,
      currentDetail: {},
      duration: '',
    };
  },
  mounted() {
    this.currentDetail = this.detailInfo;
    setInterval(() => {
      this.updateDuration();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval();
  },
  methods: {
    copyTextToClipboard,
    renderValue(item) {
      if (this.isUpdate) {
        const key = item.key;
        const customRender = item.render;

        if (has(this.detailInfo, key)) {
          let value = this.detailInfo[key];

          if (customRender && typeof customRender === 'function') {
            return customRender(key, value);
          }
          // 实时计时
          if (key == 'time') {
            this.duration = updateDuration(this.detailInfo.time);
            return this.duration;
          }

          return value;
        }
        return '--';
      }
      return '';
    },
    // 计算持续时长
    updateDuration() {
      let duration = moment.duration(this.duration);
      duration.add(1, 'second');
      const currentDuration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
      this.duration = currentDuration;
      this.currentDetail['time'] = currentDuration;
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
