<!--
 * @Description: block概要
 * @Author: yuanzeyu
 * @Date: 2023-10-31 08:44:17
 * @LastEditTime: 2023-10-31 13:45:14
-->
<template>
  <div class="detail-list">
    <div class="detail-item" v-for="item in BLOCK_DETAIL_COLUMNS" :key="item.key">
      <span class="detail-label">{{ item.title }}</span>
      <span v-if="item.custom" class="detail-value">{{ item.render(item.dataIndex) }}</span>
      <span v-else class="detail-value">{{ detailInfo[item.dataIndex] || '--' }}</span>
      <a-icon type="copy" v-if="item.copyable" />
    </div>
  </div>
</template>

<script>
import { BLOCK_DETAIL_COLUMNS, getCustomRender } from '@/static/column';
import { handleHash } from '@/utils/utils';
export default {
  name: 'blockDetail',
  props: ['detailInfo'],
  data() {
    return {
      BLOCK_DETAIL_COLUMNS,
    };
  },
  methods: {
    handleItem(item) {
      switch (item.dataIndex) {
        case 'hash':
          console.log(handleHash(this.detailInfo[item.dataIndex]));
          return handleHash(this.detailInfo[item.dataIndex]);
        // break;

        default:
          return `--`;
      }
    },
    customRender(key, value) {
      const render = getCustomRender(key);
      if (render) {
        return render(key, value);
      }
      return value;
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
