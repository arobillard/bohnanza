export function handleTrade(
  response,
  tradeRef,
  trades,
  trade,
  setTrades,
  thisUser
) {
  const updatedTrade = { ...trade };
  let unableToTrade = false;
  if (response === 'reject') {
    updatedTrade.status = 'rejected';
  } else if (updatedTrade.from === thisUser.id) {
    let hasTheCards = false;
    const hand = [...thisUser.hand];
    updatedTrade.give.forEach((card) => {
      if (hand.includes(card.card)) {
        hasTheCards = true;
        hand.splice(hand.indexOf(card.card), 1);
      } else {
        hasTheCards = false;
      }
    });
    if (hasTheCards) {
      updatedTrade.fromAccept = true;
    } else {
      unableToTrade = true;
    }
  } else if (updatedTrade.to === thisUser.id) {
    let hasTheCards = false;
    const hand = [...thisUser.hand];
    updatedTrade.get.forEach((card) => {
      if (hand.includes(card.card)) {
        hasTheCards = true;
        hand.splice(hand.indexOf(card.card), 1);
      } else {
        hasTheCards = false;
      }
    });
    if (hasTheCards) {
      updatedTrade.toAccept = true;
    } else {
      unableToTrade = true;
    }
  }
  if (updatedTrade.fromAccept && updatedTrade.toAccept) {
    updatedTrade.status = 'accepted';
  }
  const updatedTrades = [...trades];
  updatedTrades[tradeRef] = updatedTrade;
  setTrades(updatedTrades);
  if (unableToTrade) {
    return 'Unable to Trade';
  }
  return updatedTrade.status;
}

export function exchangeCards(from, give, to, get, users, setUsers) {
  const updatedUsers = [...users];

  give.reverse().forEach((card) => {
    updatedUsers[to].pot.push(card.card);
    const updatedHand = [
      ...updatedUsers[from].hand.slice(0, card.pos),
      ...updatedUsers[from].hand.slice(card.pos + 1),
    ];
    updatedUsers[from].hand = [...updatedHand];
  });
  get.reverse().forEach((card) => {
    updatedUsers[from].pot.push(card.card);
    const updatedHand = [
      ...updatedUsers[to].hand.slice(0, card.pos),
      ...updatedUsers[to].hand.slice(card.pos + 1),
    ];
    updatedUsers[to].hand = [...updatedHand];
  });
  // Reverse order and go down should work!
}
