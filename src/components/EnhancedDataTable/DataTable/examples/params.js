export const sizeOptions = ['short', 'normal', 'tall'];
export const initialSize = 'normal';

export const initialRows = [
  {
    id: 'a',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Round robin',
    attached_groups: 'Kevins VM Groups',
    group_id: 'g1',
    status: 'Disabled',
    created_at: '2021-09-28T13:48:00.000Z',
  },
  {
    id: 'b',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: 443,
    rule: 'Round robin',
    attached_groups: 'Maureens VM Groups',
    group_id: 'g2',
    status: 'Starting',
    created_at: '2021-09-29T14:48:00.000Z',
  },
  {
    id: 'c',
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    port: 80,
    rule: 'DNS delegation',
    attached_groups: 'Andrews VM Groups',
    group_id: 'g3',
    status: 'Active',
    created_at: '2021-10-01T15:48:00.000Z',
  },
  {
    id: 'd',
    name: 'Load Balancer 6',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Round robin',
    attached_groups: 'Maureens VM Groups',
    group_id: 'g2',
    status: 'Disabled',
    created_at: '2021-10-02T16:48:00.000Z',
  },
  {
    id: 'e',
    name: 'Load Balancer 4',
    protocol: 'HTTP',
    port: 443,
    rule: 'Round robin',
    attached_groups: 'Maureens VM Groups',
    group_id: 'g2',
    status: 'Starting',
    created_at: '2021-10-03T17:48:00.000Z',
  },
  {
    id: 'f',
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: 80,
    rule: 'DNS delegation',
    attached_groups: 'Andrews VM Groups',
    group_id: 'g3',
    status: 'Active',
    created_at: '2021-11-15T18:48:00.000Z',
  },
];

export const filterItems = {
  port: [
    { id: 3000, label: 3000 },
    { id: 443, label: 443 },
    { id: 80, label: 80 },
  ],
  rule: [
    { id: 'Round robin', label: 'Round robin' },
    { id: 'DNS delegation', label: 'DNS delegation' },
  ],
  attached_groups: [
    { id: 'g1', label: 'Kevins VM Groups' },
    { id: 'g2', label: 'Maureens VM Groups' },
    { id: 'g3', label: 'Andrews VM Groups' },
  ],
  status: [
    { id: 'Disabled', label: 'Disabled' },
    { id: 'Starting', label: 'Starting' },
    { id: 'Active', label: 'Active' },
  ],
  created_at: {},
};

export const filterKeys = {
  attached_groups: 'group_id',
};

export const initialHeaders = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'protocol',
    header: 'Protocol',
  },
  {
    key: 'port',
    header: 'Port',
  },
  {
    key: 'rule',
    header: 'Rule',
  },
  {
    key: 'attached_groups',
    header: 'Attached Groups',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'created_at',
    header: 'Created',
  },
];

export const initialColsNoProtocol = [
  'name',
  'port',
  'rule',
  'attached_groups',
  'status',
  'created_at',
];

export const defaultSettings = {
  defaultSize: initialSize,
  defaultCols: [...initialColsNoProtocol],
};

export const initialFilters = {
  port: [],
  rule: [],
  status: ['Active', 'Starting'],
  attached_groups: ['g2', 'g3'],
  created_at: [new Date('2021-10-01T12:00:00.000Z'), new Date('2021-10-03T23:00:00.000Z')],
};

export const initialExternalFilters = {
  port: [],
  attached_groups: ['g2'],
};
