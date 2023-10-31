import { handleHash, updateDuration } from '@/utils/utils';

export const COLUMNS = [
  {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
  },
];
export const BLOCK_DETAIL_COLUMNS = [
  {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
    copyable: true,
    custom: true,
    render: customRender,
  },
  {
    title: 'Capacity',
    dataIndex: 'capacity',
    key: 'capacity',
  },
  {
    title: 'Distance',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: 'BTC',
    dataIndex: 'btc',
    key: 'btc',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Value Today',
    dataIndex: 'valueToday',
    key: 'valueToday',
  },
  {
    title: 'Average Value',
    dataIndex: 'averageValue',
    key: 'averageValue',
  },
  {
    title: 'Median Value',
    dataIndex: 'medianValue',
    key: 'medianValue',
  },
  {
    title: 'Input Value',
    dataIndex: 'inputValue',
    key: 'inputValue',
  },
  {
    title: 'Output Value',
    dataIndex: 'outputValue',
    key: 'outputValue',
  },
  {
    title: 'Transactions',
    dataIndex: 'transactions',
    key: 'transactions',
  },
  {
    title: "Witness Tx's",
    dataIndex: 'witnessTxs',
    key: 'witnessTxs',
  },
  {
    title: 'Inputs',
    dataIndex: 'inputs',
    key: 'inputs',
  },
  {
    title: 'Outputs',
    dataIndex: 'outputs',
    key: 'outputs',
  },
  {
    title: 'Fees',
    dataIndex: 'fees',
    key: 'fees',
  },
  {
    title: 'Fees Kb',
    dataIndex: 'feesKb',
    key: 'feesKb',
  },
  {
    title: 'Fees kWU',
    dataIndex: 'feesKwu',
    key: 'feesKwu',
  },
  {
    title: 'Depth',
    dataIndex: 'depth',
    key: 'depth',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'Merkle Root',
    dataIndex: 'merkleRoot',
    key: 'merkleRoot',
  },
  {
    title: 'Difficulty',
    dataIndex: 'difficulty',
    key: 'difficulty',
  },
  {
    title: 'Nonce',
    dataIndex: 'nonce',
    key: 'nonce',
  },
  {
    title: 'Bits',
    dataIndex: 'bits',
    key: 'bits',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Minted',
    dataIndex: 'minted',
    key: 'minted',
  },
  {
    title: 'Reward',
    dataIndex: 'reward',
    key: 'reward',
  },
  {
    title: 'Mined on',
    dataIndex: 'minedOn',
    key: 'minedOn',
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
  },
  {
    title: 'Confirmations',
    dataIndex: 'confirmations',
    key: 'confirmations',
  },
  {
    title: 'Fee Range',
    dataIndex: 'feeRange',
    key: 'feeRange',
  },
  {
    title: 'Average Fee',
    dataIndex: 'averageFee',
    key: 'averageFee',
  },
  {
    title: 'Median Fee',
    dataIndex: 'medianFee',
    key: 'medianFee',
  },
  {
    title: 'Miner',
    dataIndex: 'miner',
    key: 'miner',
  },
];

// 自定义渲染方法
function customRender(key, value) {
  if (key === 'hash') {
    return handleHash(value);
  }
  if(key === 'time') {
    return updateDuration(value)
  }
  // 其他自定义渲染逻辑...
}
