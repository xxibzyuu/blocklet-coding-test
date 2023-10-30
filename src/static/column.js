export const COLUMNS = [
  {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash'
  }
]
export const BLOCK_DETAIL_COLUMNS = [
  {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
    copyable: true,
    // renderText: (text) => (text ? <a>{text}</a> : '-')
  },
  {
    title: 'Confirmations',
    dataIndex: 'confirmations',
    key: 'confirmations',
    valueType: 'digit',
    // @mock
    // renderText: () => random(0, 9999)
  },
  {
    title: 'Timestamp',
    dataIndex: 'time',
    key: 'timestamp',
    valueType: 'dateTime',
    // API返回的时间戳需要转为毫秒级别
    // renderText: (value) => {
    //   if (isNumber(value)) {
    //     return value * 1000;
    //   }
    //   return value;
    // }
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    valueType: 'digit'
  },
  {
    title: 'Miner',
    dataIndex: 'miner',
    key: 'miner',
    valueType: 'link',
    // @mock
    // renderText: (value) => value || 'ArcBlock'
  },
  {
    title: 'Number of Transactions',
    dataIndex: 'n_tx',
    key: 'numberOfTransactions',
    valueType: 'digit'
  },
  {
    title: 'Difficulty',
    dataIndex: 'difficulty',
    key: 'difficulty',
    // @mock
    // renderText: () => random(100000, 999999) * 10000,
    valueType: 'digit'
  },
  {
    title: 'Merkle root',
    dataIndex: 'mrkl_root',
    key: 'merkleRoot'
  },
  {
    title: 'Version',
    dataIndex: 'ver',
    key: 'version',
    // renderText: (value) => value && `0x${value}`
  },
  {
    title: 'Bits',
    dataIndex: 'bits',
    key: 'bits',
    valueType: 'digit'
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    valueType: 'digit'
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
    valueType: 'digit'
  },
  {
    title: 'Nonce',
    dataIndex: 'nonce',
    key: 'nonce',
    valueType: 'digit'
  },
  {
    title: 'Transaction Volume',
    dataIndex: 'transactionVolume',
    key: 'transactionVolume',
    valueType: 'digitWithBTC' //自定义valueType 带BTC格式化
  },
  {
    title: 'Block Reward',
    dataIndex: 'blockReward',
    key: 'blockReward',
    valueType: 'digitWithBTC' //自定义valueType 带BTC格式化
  },
  {
    title: 'Fee Reward',
    dataIndex: 'fee',
    key: 'feeReward',
    valueType: 'digitWithBTC' //自定义valueType 带BTC格式化
  },
];