export const sampleMessages = [
  {
    user: 3,
    message: 'Hello there',
    type: 'message',
  },
  {
    user: 0,
    message: 'General Kenobi',
    type: 'message',
  },
  {
    user: 1,
    type: 'trade',
    tradeRef: 0,
  },
  {
    user: 4,
    type: 'trade',
    tradeRef: 1,
  },
];

export const sampleTrades = [
  {
    from: 2,
    fromAccept: true,
    give: [{ card: 7, pos: 3 }],
    to: 0,
    toAccept: false,
    get: [
      { card: 10, pos: 3 },
      { card: 10, pos: 4 },
    ],
    status: 'pending',
  },
  {
    from: 4,
    fromAccept: false,
    give: [{ card: 4, pos: 1 }],
    to: 3,
    toAccept: false,
    get: [
      { card: 6, pos: 3 },
      { card: 6, pos: 4 },
    ],
    status: 'rejected',
  },
];
