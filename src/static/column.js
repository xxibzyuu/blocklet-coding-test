import { handleHash } from '@/utils/utils';

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
    dataIndex: 'distance',
    key: 'distance',
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
//     {
//       title: 'Hash',
//       dataIndex: 'hash',
//       key: 'hash',
//       copyable: true,
//       custom: true,
//       render: customRender
//     },
//     {
//       title: 'Confirmations',
//     dataIndex: 'confirmations',
//     key: 'confirmations',
//     valueType: 'digit',
//     // @mock
//     // renderText: () => random(0, 9999)
//   },
//   {
//     title: 'Timestamp',
//     dataIndex: 'time',
//     key: 'timestamp',
//     valueType: 'dateTime',
//     // API返回的时间戳需要转为毫秒级别
//     // renderText: (value) => {
//     //   if (isNumber(value)) {
//     //     return value * 1000;
//     //   }
//     //   return value;
//     // }
//   },
//   {
//     title: 'Height',
//     dataIndex: 'height',
//     key: 'height',
//     valueType: 'digit'
//   },
//   {
//     title: 'Miner',
//     dataIndex: 'miner',
//     key: 'miner',
//     valueType: 'link',
//     // @mock
//     // renderText: (value) => value || 'ArcBlock'
//   },
//   {
//     title: 'Number of Transactions',
//     dataIndex: 'n_tx',
//     key: 'numberOfTransactions',
//     valueType: 'digit'
//   },
//   {
//     title: 'Difficulty',
//     dataIndex: 'difficulty',
//     key: 'difficulty',
//     // @mock
//     // renderText: () => random(100000, 999999) * 10000,
//     valueType: 'digit'
//   },
//   {
//     title: 'Merkle root',
//     dataIndex: 'mrkl_root',
//     key: 'merkleRoot'
//   },
//   {
//     title: 'Version',
//     dataIndex: 'ver',
//     key: 'version',
//     // renderText: (value) => value && `0x${value}`
//   },
//   {
//     title: 'Bits',
//     dataIndex: 'bits',
//     key: 'bits',
//     valueType: 'digit'
//   },
//   {
//     title: 'Weight',
//     dataIndex: 'weight',
//     key: 'weight',
//     valueType: 'digit'
//   },
//   {
//     title: 'Size',
//     dataIndex: 'size',
//     key: 'size',
//     valueType: 'digit'
//   },
//   {
//     title: 'Nonce',
//     dataIndex: 'nonce',
//     key: 'nonce',
//     valueType: 'digit'
//   },
//   {
//     title: 'Transaction Volume',
//     dataIndex: 'transactionVolume',
//     key: 'transactionVolume',
//     valueType: 'digitWithBTC' //自定义valueType 带BTC格式化
//   },
//   {
//     title: 'Block Reward',
//     dataIndex: 'blockReward',
//     key: 'blockReward',
//     valueType: 'digitWithBTC' //自定义valueType 带BTC格式化
//   },
//   {
//     title: 'Fee Reward',
//     dataIndex: 'fee',
//     key: 'feeReward',
//     valueType: 'digitWithBTC' //自定义valueType 带BTC格式化
//   },
// ];

function customRender(key, value) {
  // 自定义渲染方法
  if (key === 'hash') {
    return handleHash(value);
  }
  // 其他自定义渲染逻辑...
}

export function getCustomRender(key) {
  const item = BLOCK_DETAIL_COLUMNS.find((item) => item.key === key);
  return item ? item.render : null;
}
